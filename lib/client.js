'use strict';

const merge = require('lodash.merge'),
	defaults = require('lodash.defaults');

class Client {
	constructor(options) {
		options = options || {};
		let config = merge({}, options);

		config = defaults(config, { url: 'https://api.mailgun.net' });

		if (!config.mashapeKey) {
			throw new Error('Parameter "mashapeKey" is required');
		} else if (!config.animetricsKey) {
			throw new Error('Parameter "animetricsKey" is required');
		}

	}
}

module.exports = Client;
