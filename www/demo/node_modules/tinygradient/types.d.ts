/*!
 * TinyGradient 1.1.2
 * Copyright 2014-2020 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

import * as tinycolor from 'tinycolor2';

declare namespace tinygradient {

    type ArcMode = boolean | 'short' | 'long';

    type CssMode = 'linear' | 'radial';

    type StopInput = {
        color?: tinycolor.ColorInput
        pos?: number
    }

    interface Instance {
        stops: StopInput[]

        /**
         * Return new instance with reversed stops
         * @return {Instance}
         */
        reverse(): Instance;

        /**
         * Return new instance with looped stops
         * @return {Instance}
         */
        loop(): Instance;

        /**
         * Generate gradient with RGBa interpolation
         * @param {int} steps
         * @return {tinycolor.Instance[]}
         */
        rgb(steps: number): tinycolor.Instance[];

        /**
         * Generate gradient with HSVa interpolation
         * @param {int} steps
         * @param {ArcMode} [mode=false]
         *    - false to step in clockwise
         *    - true to step in trigonometric order
         *    - 'short' to use the shortest way
         *    - 'long' to use the longest way
         * @return {tinycolor.Instance[]}
         */
        hsv(steps: number, mode: ArcMode): tinycolor.Instance[];

        /**
         * Generate CSS3 command (no prefix) for this gradient
         * @param {CssMode} [mode=linear] - 'linear' or 'radial'
         * @param {String} [direction] - default is 'to right' or 'ellipse at center'
         * @return {String}
         */
        css(mode?: CssMode, direction?: string): string;

        /**
         * Returns the color at specific position with RGBa interpolation
         * @param {float} pos, between 0 and 1
         * @return {tinycolor.Instance}
         */
        rgbAt(pos: number): tinycolor.Instance;

        /**
         * Returns the color at specific position with HSVa interpolation
         * @param {float} pos, between 0 and 1
         * @return {tinycolor.Instance}
         */
        hsvAt(pos: number): tinycolor.Instance;

    }

    interface Constructor {
        /**
         * @class tinygradient
         * @param {StopInput} stops
         */
        new (stops: StopInput[]): Instance;
        new (...stops: StopInput[]): Instance;
        (stops: StopInput[]): Instance;
        (...stops: StopInput[]): Instance;

        /**
         * @class tinygradient
         * @param {tinycolor.ColorInput[]} stops
         */
        new (stops: tinycolor.ColorInput[]): Instance;
        new (...stops: tinycolor.ColorInput[]): Instance;
        (stops: tinycolor.ColorInput[]): Instance;
        (...stops: tinycolor.ColorInput[]): Instance;
    }
}

declare const tinygradient: tinygradient.Constructor;
export = tinygradient;
export as namespace tinygradient;
