'use strict';

const merge = require('lodash.merge'),
	DetectClient = require('./detect');

/**
 * mashape-animetrics-face-api module
 * @class Detect
 * @constructor
 */

class Image {
	constructor(request) {
		this.detect = '';
		this.request = request;
		this.detect = new DetectClient(this.request)
	}
}

module.exports = Image;
