'use strict';



import Client from './lib/client'

const version = require('./package.json').version;

module.exports = {
	VERSION: version,
	client: function(options) {
		return new Client(options);
	}
};