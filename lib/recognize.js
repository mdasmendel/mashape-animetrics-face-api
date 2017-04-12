'use strict';
/**
 * mashape-animetrics-face-api module
 * @class Recognize
 * @constructor
 */

class Recognize {
	constructor(data) {
		this.candidates = data.images[0].candidates;
		this.topCandidate = null;
		this.candidatesArr = [];
	}

	/**
	 * Get candidates list
	 * @method get
	 * @return {Array<Object>}
	 */
	get() {

		if (this.candidatesArr) {
			return this.candidatesArr
		}

		for (let candidateId in this.candidates) {
			this.candidatesArr.push({
				id: candidateId,
				probability: this.candidates[candidateId]
			});
		}
		return this.candidatesArr
	}

	/**
	 * Get top candidates
	 * @method get
	 * @return {Object}
	 */
	getTop() {

		if (this.topCandidate) {
			return this.topCandidate
		}

		let probability = 0;
		for (let candidateId in this.candidates) {
			if (this.candidates[candidateId] > probability) {
				this.topCandidate = {
					id: candidateId,
					probability: this.candidates[candidateId]
				};
				probability = this.candidates[candidateId]
			}
		}

		return this.topCandidate
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
