'use strict';

const RecognizeClient = require('./recognize'),
	EnrollClient = require('./enroll');

/**
 * mashape-animetrics-face-api module
 * @class Gallery
 * @constructor
 */

class Gallery {
	constructor(request, id) {
		this.id = id;
		this.request = request;
	}

	/**
	 * Get subjects from gallery
	 * @method getSubjects
	 * @return {Array}
	 */
	getSubjects() {
		let params = {
			gallery_id: this.id
		};
		return this.request.get('/view_gallery', params)
			.then(response => {
				return response.body.subject_ids
			})
	}

	/**
	 * Enroll in this gallery
	 * @method enroll
	 * @param {Object} image Image data
	 * @param {Object} face Face data
	 * @param {String} subjectId Face index
	 * @return {Enroll}
	 */
	enroll(image, face, subjectId) {
		return new EnrollClient(this.request, image, face).execute(this.id, subjectId)
	}


	/**
	 * Recognize face in this group
	 * @method recognize
	 * @param {Object} image Image object - mast contain image_id
	 * @param {Object} face FAce object - mast contain face data
	 * @return {Recognize}
	 */
	recognize(image, face) {
		return new RecognizeClient(this.request).execute(this.id, image, face)
	}
}

/**
 * mashape-animetrics-face-api module
 * @class GalleryClient
 * @constructor
 */

class GalleryClient {

	constructor(request) {
		this.request = request;
	}

	/**
	 * Get one subjects from gallery
	 * @method get
	 * @param {String} id Gallery id
	 * @return {Gallery}
	 */
	get(id) {
		return new Gallery(
			this.request,
			id
		);
	}

	/**
	 * Get list subjects from gallery
	 * @method list
	 * @return [Gallery]
	 */
	list() {
		return this.request.get('/list_galleries')
			.then(response => {
				let galleries = [];
				for (let galleryId of response.body.gallery_ids) {
					galleries.push(new Gallery(
						this.request,
						galleryId
					))
				}
				return galleries
			})
	}
}

module.exports = GalleryClient;
