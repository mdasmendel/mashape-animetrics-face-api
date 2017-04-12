'use strict';
/**
 * mashape-animetrics-face-api module
 * @class Recognize
 * @constructor
 */

class Recognize {
	constructor(data) {
		this.candidates = data.images[0].candidates;
	}
}

/**
 * mashape-animetrics-face-api module
 * @class RecognizeClient
 * @constructor
 */

class RecognizeClient {

	constructor(request) {
		this.request = request;

		this.path = '/recognize';
	}

	/**
	 * Form response
	 * @method _recognize
	 * @param {Object} response API response
	 * @return {Recognize}
	 * @private
	 */
	_recognize(response) {
		return new Recognize(
			response.body
		)
	}

	/**
	 * Recognize face
	 * @method execute
	 * @param {String} galleryId Gallery Id
	 * @param {Object} image Image object - mast contain image_id
	 * @param {Object} face FAce object - mast contain face data
	 * @return {Recognize}
	 */

	execute(galleryId, image, face) {
		let params = {
			gallery_id: galleryId,
			image_id: image.image_id,
			topLeftX: face.topLeftX,
			topLeftY: face.topLeftY,
			width: face.width,
			height: face.height,

		};

		return this.request.get(this.path, params)
			.then(this._recognize)
	}
}

module.exports = RecognizeClient;
