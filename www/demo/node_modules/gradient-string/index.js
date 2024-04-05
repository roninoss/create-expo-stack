'use strict';

const chalk = require('chalk');
const tinygradient = require('tinygradient');

const forbiddenChars = /\s/g;

function InitGradient(...args) {
	const grad = tinygradient.apply(this, args);
	const ret = (str, opts) => applyGradient(str ? str.toString() : '', grad, opts);
	ret.multiline = (str, opts) => multilineGradient(str ? str.toString() : '', grad, opts);
	return ret;
}

const getColors = (gradient, options, count) => options.interpolation.toLowerCase() === 'hsv' ?
	gradient.hsv(count, options.hsvSpin.toLowerCase()) : gradient.rgb(count);

function applyGradient(str, gradient, opts) {
	const options = validateOptions(opts);
	const colorsCount = Math.max(str.replace(forbiddenChars, '').length, gradient.stops.length);
	const colors = getColors(gradient, options, colorsCount);
	let result = '';
	for (const s of str) {
		result += s.match(forbiddenChars) ? s : chalk.hex(colors.shift().toHex())(s);
	}
	return result;
}

function multilineGradient(str, gradient, opts) {
	const options = validateOptions(opts);
	const lines = str.split('\n');
	const maxLength = Math.max.apply(null, lines.map(l => l.length).concat([gradient.stops.length]));
	const colors = getColors(gradient, options, maxLength);
	const results = [];
	for (const line of lines) {
		const lineColors = colors.slice(0);
		let lineResult = '';
		for (const l of line) {
			lineResult += chalk.hex(lineColors.shift().toHex())(l);
		}
		results.push(lineResult);
	}
	return results.join('\n');
}

function validateOptions(opts) {
	const options = {interpolation: 'rgb', hsvSpin: 'short', ...opts};
	if (opts !== undefined && typeof opts !== 'object') {
		throw new TypeError(`Expected \`options\` to be an \`object\`, got \`${typeof opts}\``);
	}

	if (typeof options.interpolation !== 'string') {
		throw new TypeError(`Expected \`options.interpolation\` to be a \`string\`, got \`${typeof options.interpolation}\``);
	}

	if (options.interpolation.toLowerCase() === 'hsv' && typeof options.hsvSpin !== 'string') {
		throw new TypeError(`Expected \`options.hsvSpin\` to be a \`string\`, got \`${typeof options.hsvSpin}\``);
	}
	return options;
}

const aliases = {
	atlas: {colors: ['#feac5e', '#c779d0', '#4bc0c8'], options: {}},
	cristal: {colors: ['#bdfff3', '#4ac29a'], options: {}},
	teen: {colors: ['#77a1d3', '#79cbca', '#e684ae'], options: {}},
	mind: {colors: ['#473b7b', '#3584a7', '#30d2be'], options: {}},
	morning: {colors: ['#ff5f6d', '#ffc371'], options: {interpolation: 'hsv'}},
	vice: {colors: ['#5ee7df', '#b490ca'], options: {interpolation: 'hsv'}},
	passion: {colors: ['#f43b47', '#453a94'], options: {}},
	fruit: {colors: ['#ff4e50', '#f9d423'], options: {}},
	instagram: {colors: ['#833ab4', '#fd1d1d', '#fcb045'], options: {}},
	retro: {colors: ['#3f51b1', '#5a55ae', '#7b5fac', '#8f6aae', '#a86aa4', '#cc6b8e', '#f18271', '#f3a469', '#f7c978'], options: {}},
	summer: {colors: ['#fdbb2d', '#22c1c3'], options: {}},
	rainbow: {colors: ['#ff0000', '#ff0100'], options: {interpolation: 'hsv', hsvSpin: 'long'}},
	pastel: {colors: ['#74ebd5', '#74ecd5'], options: {interpolation: 'hsv', hsvSpin: 'long'}}
};

module.exports = InitGradient;
for (const a in aliases) { // eslint-disable-line guard-for-in
	module.exports[a] = str => new InitGradient(aliases[a].colors)(str, aliases[a].options);
	module.exports[a].multiline = str => new InitGradient(aliases[a].colors).multiline(str, aliases[a].options);
}
