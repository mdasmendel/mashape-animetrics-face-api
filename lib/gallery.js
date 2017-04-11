'use strict';

/**
 * mashape-animetrics-face-api module
 * @class GalleryClient
 * @constructor
 */

class GalleryClient {

	constructor(request, id) {
		this.request = request;
		this.id = id;
	}

	/**
	 * Form response
	 * @method _recognize
	 * @param {Object} response API response
	 * @return {Object}
	 * @private
	 */
	_recognize(response) {
		if (!response.body.images || !response.body.images.length)
			throw new Error('No images in response');

		return {
			candidates: response.body.images[0].candidates
		}
	}

	/**
	 * Form response
	 * @method _get
	 * @param {Object} response API response
	 * @return {Array}
	 * @private
	 */
	_get(response) {
		return  response.body.subject_ids
	}

	/**
	 * Recognize face
	 * @method recognize
	 * @param {Object} image Image object - mast contain image_id
	 * @param {Object} face FAce object - mast contain face data
	 * @return {Object}
	 */
	recognize(image, face) {
		let params = {
			gallery_id: this.id,
			image_id: image.image_id,
			topLeftX: face.topLeftX,
			topLeftY: face.topLeftY,
			width: face.width,
			height: face.height,

		};

		return this.request.get('/recognize', params)
			.then(this._recognize)
	}

	/**
	 * Get subjects from gallery
	 * @method get
	 * @return {Array}
	 */
	get() {
		let params = {
			gallery_id: this.id
		};
		console.log(params)
		return this.request.get('/view_gallery', params)
			.then(this._get)
	}
}

module.exports = GalleryClient;
