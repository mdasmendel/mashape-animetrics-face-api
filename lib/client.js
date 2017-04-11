'use strict';

const merge = require('lodash.merge'),
	defaults = require('lodash.defaults'),
	DetectClient = require('./detect'),
	Request = require('./request');

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
			url: 'https://animetrics.p.mashape.com',
			headers: {
				'X-Mashape-Key': config.mashapeKey,
				'Accept': 'application/json'
			},
			query: {
				api_key: config.animetricsKey
			}
		});

		this.request = new Request(config);

		this.detect = new DetectClient(this.request)

	}
}

module.exports = Client;
