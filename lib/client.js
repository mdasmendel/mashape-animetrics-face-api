'use strict';

const merge = require('lodash.merge'),
	defaults = require('lodash.defaults'),
	DetectClient = require('./detect'),
	EnrollClient = require('./enroll'),
	GalleryClient = require('./gallery'),
	Request = require('./utils/request');

/**
 * mashape-animetrics-face-api module
 * @class mashape-animetrics-face-api
 * @constructor
 */

class Client {

	constructor(options = {}) {

		let config = merge({}, options);

		if (!config.mashapeKey) {
			throw new Error('Parameter "mashapeKey" is required');
		} else if (!config.animetricsKey) {
			throw new Error('Parameter "animetricsKey" is required');
		}

		config = defaults(config, {
			url: 'https://animetrics.p.mashape.com/v2',
			headers: {
				'X-Mashape-Key': config.mashapeKey,
				'Accept': 'application/json'
			},
			query: {
				api_key: config.animetricsKey
			}
		});

		this.request = new Request(config);

		this.detect = new DetectClient(this.request);

	}

	/**
	 * Enroll image
	 * @method enroll
	 * @param {Object} image Image
	 * @param {Object} face Face
	 * @return {EnrollClient} Instance of EnrollClient class
	 * @private
	 */

	enroll(image, face){
		return new EnrollClient(this.request, image, face)
	}

	gallery(id){
		return new GalleryClient(this.request, id)
	}
}

module.exports = Client;
