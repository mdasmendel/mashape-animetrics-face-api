'use strict';
/**
 * mashape-animetrics-face-api module
 * @class Enroll
 * @constructor
 */

class Enroll {
	constructor(data) {
		this.faceId = data.transaction.face_id;
		this.imageId = data.transaction.image_id;
		this.subjectId = data.transaction.subject_id;
		this.galleryId = data.transaction.gallery_id;
	}
}

/**
 * mashape-animetrics-face-api module
 * @class EnrollClient
 * @constructor
 */

class EnrollClient {

	constructor(request, image, face) {
		this.request = request;
		this.image = image;
		this.face = face;

		this.path = '/enroll';
	}

	_enroll(response){
		return new Enroll(response.body.images[0])
	}

	execute(galleryId, subjectId){
		let params = {
			gallery_id: galleryId,
			subject_id: subjectId,
			image_id: this.image.image_id,
			topLeftX: this.face.topLeftX,
			topLeftY: this.face.topLeftY,
			width: this.face.width,
			height: this.face.height,

		};

		return this.request.get(this.path, params)
			.then(this._enroll)
	}
}

module.exports = EnrollClient;
