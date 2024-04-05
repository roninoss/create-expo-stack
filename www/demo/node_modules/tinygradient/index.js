const tinycolor = require('tinycolor2');

/**
 * @typedef {Object} TinyGradient.StopInput
 * @property {ColorInput} color
 * @property {number} pos
 */

/**
 * @typedef {Object} TinyGradient.StepValue
 * @type {number} [r]
 * @type {number} [g]
 * @type {number} [b]
 * @type {number} [h]
 * @type {number} [s]
 * @type {number} [v]
 * @type {number} [a]
 */

/**
 * @type {StepValue}
 */
const RGBA_MAX = { r: 256, g: 256, b: 256, a: 1 };

/**
 * @type {StepValue}
 */
const HSVA_MAX = { h: 360, s: 1, v: 1, a: 1 };

/**
 * Linearly compute the step size between start and end (not normalized)
 * @param {StepValue} start
 * @param {StepValue} end
 * @param {number} steps - number of desired steps
 * @return {StepValue}
 */
function stepize(start, end, steps) {
    let step = {};

    for (let k in start) {
        if (start.hasOwnProperty(k)) {
            step[k] = steps === 0 ? 0 : (end[k] - start[k]) / steps;
        }
    }

    return step;
}

/**
 * Compute the final step color
 * @param {StepValue} step - from `stepize`
 * @param {StepValue} start
 * @param {number} i - color index
 * @param {StepValue} max - rgba or hsva of maximum values for each channel
 * @return {StepValue}
 */
function interpolate(step, start, i, max) {
    let color = {};

    for (let k in start) {
        if (start.hasOwnProperty(k)) {
            color[k] = step[k] * i + start[k];
            color[k] = color[k] < 0 ? color[k] + max[k] : (max[k] !== 1 ? color[k] % max[k] : color[k]);
        }
    }

    return color;
}

/**
 * Generate gradient with RGBa interpolation
 * @param {StopInput} stop1
 * @param {StopInput} stop2
 * @param {number} steps
 * @return {tinycolor[]} color1 included, color2 excluded
 */
function interpolateRgb(stop1, stop2, steps) {
    const start = stop1.color.toRgb();
    const end = stop2.color.toRgb();
    const step = stepize(start, end, steps);
    let gradient = [stop1.color];

    for (let i = 1; i < steps; i++) {
        const color = interpolate(step, start, i, RGBA_MAX);
        gradient.push(tinycolor(color));
    }

    return gradient;
}

/**
 * Generate gradient with HSVa interpolation
 * @param {StopInput} stop1
 * @param {StopInput} stop2
 * @param {number} steps
 * @param {boolean|'long'|'short'} mode
 * @return {tinycolor[]} color1 included, color2 excluded
 */
function interpolateHsv(stop1, stop2, steps, mode) {
    const start = stop1.color.toHsv();
    const end = stop2.color.toHsv();

    // rgb interpolation if one of the steps in grayscale
    if (start.s === 0 || end.s === 0) {
        return interpolateRgb(stop1, stop2, steps);
    }

    let trigonometric;
    if (typeof mode === 'boolean') {
        trigonometric = mode;
    }
    else {
        const trigShortest = (start.h < end.h && end.h - start.h < 180) || (start.h > end.h && start.h - end.h > 180);
        trigonometric = (mode === 'long' && trigShortest) || (mode === 'short' && !trigShortest);
    }

    const step = stepize(start, end, steps);
    let gradient = [stop1.color];

    // recompute hue
    let diff;
    if ((start.h <= end.h && !trigonometric) || (start.h >= end.h && trigonometric)) {
        diff = end.h - start.h;
    }
    else if (trigonometric) {
        diff = 360 - end.h + start.h;
    }
    else {
        diff = 360 - start.h + end.h;
    }
    step.h = Math.pow(-1, trigonometric ? 1 : 0) * Math.abs(diff) / steps;

    for (let i = 1; i < steps; i++) {
        const color = interpolate(step, start, i, HSVA_MAX);
        gradient.push(tinycolor(color));
    }

    return gradient;
}

/**
 * Compute substeps between each stops
 * @param {StopInput[]} stops
 * @param {number} steps
 * @return {number[]}
 */
function computeSubsteps(stops, steps) {
    const l = stops.length;

    // validation
    steps = parseInt(steps, 10);

    if (isNaN(steps) || steps < 2) {
        throw new Error('Invalid number of steps (< 2)');
    }
    if (steps < l) {
        throw new Error('Number of steps cannot be inferior to number of stops');
    }

    // compute substeps from stop positions
    let substeps = [];

    for (let i = 1; i < l; i++) {
        const step = (steps - 1) * (stops[i].pos - stops[i - 1].pos);
        substeps.push(Math.max(1, Math.round(step)));
    }

    // adjust number of steps
    let totalSubsteps = 1;
    for (let n = l - 1; n--;) totalSubsteps += substeps[n];

    while (totalSubsteps !== steps) {
        if (totalSubsteps < steps) {
            const min = Math.min.apply(null, substeps);
            substeps[substeps.indexOf(min)]++;
            totalSubsteps++;
        }
        else {
            const max = Math.max.apply(null, substeps);
            substeps[substeps.indexOf(max)]--;
            totalSubsteps--;
        }
    }

    return substeps;
}

/**
 * Compute the color at a specific position
 * @param {StopInput[]} stops
 * @param {number} pos
 * @param {string} method
 * @param {StepValue} max
 * @returns {tinycolor}
 */
function computeAt(stops, pos, method, max) {
    if (pos < 0 || pos > 1) {
        throw new Error('Position must be between 0 and 1');
    }

    let start, end;
    for (let i = 0, l = stops.length; i < l - 1; i++) {
        if (pos >= stops[i].pos && pos < stops[i + 1].pos) {
            start = stops[i];
            end = stops[i + 1];
            break;
        }
    }

    if (!start) {
        start = end = stops[stops.length - 1];
    }

    const step = stepize(start.color[method](), end.color[method](), (end.pos - start.pos) * 100);
    const color = interpolate(step, start.color[method](), (pos - start.pos) * 100, max);
    return tinycolor(color);
}

class TinyGradient {
    /**
     * @param {StopInput[]|ColorInput[]} stops
     * @returns {TinyGradient}
     */
    constructor(stops) {
        // validation
        if (stops.length < 2) {
            throw new Error('Invalid number of stops (< 2)');
        }

        const havingPositions = stops[0].pos !== undefined;
        let l = stops.length;
        let p = -1;
        let lastColorLess = false;
        // create tinycolor objects and clean positions
        this.stops = stops.map((stop, i) => {
            const hasPosition = stop.pos !== undefined;
            if (havingPositions ^ hasPosition) {
                throw new Error('Cannot mix positionned and not posionned color stops');
            }

            if (hasPosition) {
                const hasColor = stop.color !== undefined;
                if (!hasColor && (lastColorLess || i === 0 || i === l - 1)) {
                    throw new Error('Cannot define two consecutive position-only stops');
                }
                lastColorLess = !hasColor;

                stop = {
                    color    : hasColor ? tinycolor(stop.color) : null,
                    colorLess: !hasColor,
                    pos      : stop.pos
                };

                if (stop.pos < 0 || stop.pos > 1) {
                    throw new Error('Color stops positions must be between 0 and 1');
                }
                else if (stop.pos < p) {
                    throw new Error('Color stops positions are not ordered');
                }
                p = stop.pos;
            }
            else {
                stop = {
                    color: tinycolor(stop.color !== undefined ? stop.color : stop),
                    pos  : i / (l - 1)
                };
            }

            return stop;
        });

        if (this.stops[0].pos !== 0) {
            this.stops.unshift({
                color: this.stops[0].color,
                pos  : 0
            });
            l++;
        }
        if (this.stops[l - 1].pos !== 1) {
            this.stops.push({
                color: this.stops[l - 1].color,
                pos  : 1
            });
        }
    }

    /**
     * Return new instance with reversed stops
     * @return {TinyGradient}
     */
    reverse() {
        let stops = [];

        this.stops.forEach(function (stop) {
            stops.push({
                color: stop.color,
                pos  : 1 - stop.pos
            });
        });

        return new TinyGradient(stops.reverse());
    }

    /**
     * Return new instance with looped stops
     * @return {TinyGradient}
     */
    loop() {
        let stops1 = [];
        let stops2 = [];

        this.stops.forEach((stop) => {
            stops1.push({
                color: stop.color,
                pos  : stop.pos / 2
            });
        });

        this.stops.slice(0, -1).forEach((stop) => {
            stops2.push({
                color: stop.color,
                pos  : 1 - stop.pos / 2
            });
        });

        return new TinyGradient(stops1.concat(stops2.reverse()));
    }

    /**
     * Generate gradient with RGBa interpolation
     * @param {number} steps
     * @return {tinycolor[]}
     */
    rgb(steps) {
        const substeps = computeSubsteps(this.stops, steps);
        let gradient = [];

        this.stops.forEach((stop, i) => {
            if (stop.colorLess) {
                stop.color = interpolateRgb(this.stops[i - 1], this.stops[i + 1], 2)[1];
            }
        });

        for (let i = 0, l = this.stops.length; i < l - 1; i++) {
            const rgb = interpolateRgb(this.stops[i], this.stops[i + 1], substeps[i]);
            gradient.splice(gradient.length, 0, ...rgb);
        }

        gradient.push(this.stops[this.stops.length - 1].color);

        return gradient;
    }

    /**
     * Generate gradient with HSVa interpolation
     * @param {number} steps
     * @param {boolean|'long'|'short'} [mode=false]
     *    - false to step in clockwise
     *    - true to step in trigonometric order
     *    - 'short' to use the shortest way
     *    - 'long' to use the longest way
     * @return {tinycolor[]}
     */
    hsv(steps, mode) {
        const substeps = computeSubsteps(this.stops, steps);
        let gradient = [];

        this.stops.forEach((stop, i) => {
            if (stop.colorLess) {
                stop.color = interpolateHsv(this.stops[i - 1], this.stops[i + 1], 2, mode)[1];
            }
        });

        for (let i = 0, l = this.stops.length; i < l - 1; i++) {
            const hsv = interpolateHsv(this.stops[i], this.stops[i + 1], substeps[i], mode);
            gradient.splice(gradient.length, 0, ...hsv);
        }

        gradient.push(this.stops[this.stops.length - 1].color);

        return gradient;
    }

    /**
     * Generate CSS3 command (no prefix) for this gradient
     * @param {String} [mode=linear] - 'linear' or 'radial'
     * @param {String} [direction] - default is 'to right' or 'ellipse at center'
     * @return {String}
     */
    css(mode, direction) {
        mode = mode || 'linear';
        direction = direction || (mode === 'linear' ? 'to right' : 'ellipse at center');

        let css = mode + '-gradient(' + direction;
        this.stops.forEach(function (stop) {
            css += ', ' + (stop.colorLess ? '' : stop.color.toRgbString() + ' ') + (stop.pos * 100) + '%';
        });
        css += ')';
        return css;
    }

    /**
     * Returns the color at specific position with RGBa interpolation
     * @param {number} pos, between 0 and 1
     * @return {tinycolor}
     */
    rgbAt(pos) {
        return computeAt(this.stops, pos, 'toRgb', RGBA_MAX);
    }

    /**
     * Returns the color at specific position with HSVa interpolation
     * @param {number} pos, between 0 and 1
     * @return {tinycolor}
     */
    hsvAt(pos) {
        return computeAt(this.stops, pos, 'toHsv', HSVA_MAX);
    }
}

/**
 * @param {StopInput[]|ColorInput[]|StopInput...|ColorInput...} stops
 * @returns {TinyGradient}
 */
module.exports = function (stops) {
    // varargs
    if (arguments.length === 1) {
        if (!Array.isArray(arguments[0])) {
            throw new Error('"stops" is not an array');
        }
        stops = arguments[0];
    }
    else {
        stops = Array.prototype.slice.call(arguments);
    }

    return new TinyGradient(stops);
};
