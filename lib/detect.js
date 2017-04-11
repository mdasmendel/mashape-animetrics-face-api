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

	/**
	 * Get faces list
	 * @method getFaces
	 * @return {Array} The list of faces
	 */

	public getFaces(){
		return this.image.faces
	}

	/**
	 * Check if the image has faces found
	 * @method hasFaces
	 * @return {Boolean}
	 */

	public hasFaces(){
		return this.image.faces && this.image.faces.length > 0 || false
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

	/**
	 * Generate a Detect instance from response
	 * @method _detect
	 * @param {Object} response the request result
	 * @return {Detect} Instance of detect class
	 * @private
	 */

	static _detect(response) {
		return new Detect(
			response.body.images
		);
	}

	/**
	 * Check if the image has faces found
	 * @method _detect
	 * @param {String} url Image url
	 * @param {String} selector Selectors for find filter, default: FULL, ex: 'FACE, EYES, FULL'
	 * @return {Detect} Instance of detect class
	 * @private
	 */

	public fromUrl(url, selector = 'FULL') {

		return this.request.post(this.path, {
			url,
			selector
		})
			.then(this._detect)
	}

}

module.exports = DetectClient;
