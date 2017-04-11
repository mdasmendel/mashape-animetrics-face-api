
'use strict';

var merge = require('lodash.merge');
var popsicle = require('popsicle');
var status = require('popsicle-status');
var urljoin = require('url-join');
var APIError = require('./error');

class Request {
	constructor(options) {
		this.mashapeKey = options.mashapeKey;
		this.animetricsKey = options.animetricsKey;
		this.url = options.url;
		this.headers = options.headers || {};
		this.queryParams = options.query || {};
	}

	request(method, url, options) {

		let request = merge({
			method: method,
			url: urljoin(this.url, url),
			headers: this.headers,
			query: this.queryParams
		}, options);

		return popsicle.request(request)
			.use(status())
			.use(popsicle.plugins.parse('json'))
			.then(response => {
				if(response.body.errors)
					throw new APIError(response);
				else
					return response
			})
			.catch(error => {
				if (error.type === 'EINVALIDSTATUS' && error.popsicle) {
					throw new APIError(error.popsicle.response);
				} else if (error instanceof Error) {
					throw error;
				} else {
					throw new APIError(error);
				}
			});
	}

	query(method, url, params, options) {
		return this.request(method, url, merge({ query: params }, options));
	}

	command(method, url, data, options) {
		return this.request(method, url, merge({
			body: data,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}, options));
	}

	get(url, params, options) {
		console.log(this)
		return this.query('get', url, params, options);
	}

	head(url, params, options) {
		return this.query('head', url, params, options);
	}

	options(url, params, options) {
		return this.query('options', url, params, options);
	}

	post(url, data, options) {
		return this.command('post', url, data, options);
	}

	postMulti(url, data) {
		let formData = popsicle.form();
		let options = {
			headers: {'Content-Type': null}
		};

		Object.keys(data).forEach(function(key) {
			if (Array.isArray(data[key])) {
				data[key].forEach(function(item) {
					formData.append(key, item);
				});
			} else {
				formData.append(key, data[key]);
			}
		});

		return this.command('post', url, formData, options);
	}

	put(url, data, options) {
		return this.command('put', url, data, options);
	}

	patch(url, data, options) {
		return this.command('patch', url, data, options);
	}

	delete(url, data, options) {
		return this.command('delete', url, data, options);
	}
}

module.exports = Request;