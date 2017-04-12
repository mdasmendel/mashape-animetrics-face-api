'use strict';

const merge = require('lodash.merge'),
	defaults = require('lodash.defaults'),
	DetectClient = require('./detect'),
	GalleryClient = require('./gallery'),
	Request = require('./utils/request');

/**
 * mashape-animetrics-face-api module
 * @class Client
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
	 * Get one gallery by id
	 * @method gallery
	 * @param {String} id The gallery id
	 * @return {Gallery} Instance of EnrollClient class
	 */
	gallery(id) {
		return new GalleryClient(this.request).get(id)
	}

	/**
	 * Get all client galleries
	 * @method galleries
	 * @return {Array<Gallery>} Instance of EnrollClient class
	 */
	galleries() {
		return new GalleryClient(this.request).list()
	}
}

module.exports = Client;
