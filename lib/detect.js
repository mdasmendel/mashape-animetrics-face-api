'use strict';

const merge = require('lodash.merge');

/**
 * mashape-animetrics-face-api module
 * @class Detect
 * @constructor
 */

class Detect {
	constructor(images) {
		if(!images.length)
			throw new Error('No images in response');
		this.image = images[0];
	}

	getFaces(){
		return this.image.faces
	}

	hasFaces(){
		return this.image.faces && this.image.faces.length
	}
}

/**
 * mashape-animetrics-face-api module
 * @class DetectClient
 * @constructor
 */

class DetectClient {

	constructor(request) {
		this.request = request;

		this.path = '/detect'
	}

	_detect(response) {
		return new Detect(
			response.body.images
		);
	}

	fromUrl(url, selector = 'FULL') {

		return this.request.post(this.path, {
			url,
			selector
		})
			.then(this._detect)
	}

}

module.exports = DetectClient;
