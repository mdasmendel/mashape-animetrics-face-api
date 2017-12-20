'use strict';

const
	EnrollClient = require('./enroll'),
	RecognizeClient = require('./recognize');

/**
 * mashape-animetrics-face-api module
 * @class Detect
 * @constructor
 */

class Detect {
	constructor(images, request) {
		if (!images.length)
			throw new Error('No images in response');

		this.request = request;

		this.faces = images[0].faces && images[0].faces.slice() || [];
		console.log('from detect:', this.faces);
		delete images[0].faces;
		this.image = images[0];
	}

	/**
	 * Get image data
	 * @method getImage
	 * @return {Object} The image object
	 */

	getImage() {
		return this.image
	}

	/**
	 * Get faces list
	 * @method getFaces
	 * @return {Array} The list of faces
	 */

	getFaces() {
		return this.faces
	}

	/**
	 * Get faces count
	 * @method getFacesCount
	 * @return {Integer} The count of faces
	 */

	getFacesCount() {
		return this.faces.length
	}

	/**
	 * Check if the image has faces found
	 * @method hasFaces
	 * @return {Boolean}
	 */

	hasFaces() {
		return this.faces.length > 0 || false
	}

	/**
	 * Get face by index
	 * @method getFace
	 * @param {Integer} index Face index
	 * @return {Object}
	 */
	getFace(index = 0) {

		if (this.faces.length <= index)
			throw new Error('Face index is out of range');

		return this.faces[index]
	}

	/**
	 * Enrol one face from image
	 * @method enroll
	 * @param {String} galleryId Gallery id
	 * @param {String} subjectId Subject id
	 * @param {Integer} index Face index
	 * @return {Enroll}
	 */
	enroll(galleryId, subjectId, index = 0) {
		return new EnrollClient(this.request, this.image, this.getFace(index)).execute(galleryId, subjectId)
	}

	/**
	 * Recognize image from detect
	 * @method recognize
	 * @param {String} galleryId Gallery id
	 * @param {Integer} index Face index
	 * @return {Recognize}
	 */

	recognize(galleryId, index = 0) {
		return new RecognizeClient(this.request).execute(galleryId, this.image, this.getFace(index))
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
	 * Get detector from url
	 * @method fromUrl
	 * @param {String} url Image url
	 * @param {String} selector Selectors for find filter, default: FULL, ex: 'FACE, EYES, FULL'
	 * @return {Detect} Instance of detect class
	 */

	fromUrl(url, selector = 'FULL') {

		return this.request.post(this.path, {
			url,
			selector
		})
			.then(response => {
				return new Detect(
					response.body.images,
					this.request
				);
			})
	}


}

module.exports = DetectClient;
