'use strict';

const version = require('./package.json').version,
	Client = require('./lib/client');

module.exports = {
	VERSION: version,
	client: function (options) {
		return new Client(options);
	}
};