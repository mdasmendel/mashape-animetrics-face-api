'use strict';

const merge = require('lodash.merge'),
	rp = require('request-promise');

/**
 * mashape-animetrics-face-api module
 * @class EnrollClient
 * @constructor
 */

class Enroll {
	constructor(data) {
		this.data = data
	}
}

/**
 * mashape-animetrics-face-api module
 * @class EnrollClient
 * @constructor
 */

class EnrollClient {

	private path = '/enroll';

	constructor(config) {
		this.options = config;
		this.rpOptions = {
			qs: {
				api_key: config.mashapeKey
			}
		}
	}

	_enroll(response){

	}

	enroll(){
		unirest.get("https://animetrics.p.mashape.com/enroll?api_key=&gallery_id=Family_Members&height=123&image_id=7245253dbd2a142ceb40e031cb173734&leftEyeCenterX=139.817&leftEyeCenterY=160.727&rightEyeCenterX=198.365&rightEyeCenterY=164.909&subject_id=John_Doe&topLeftX=105&topLeftY=188&width=123")
			.header("X-Mashape-Key", "lSsvsqEEZEmshfMTUasHIQDlyREDp1h6yVCjsnLKSkX3RKrXHU")
			.header("Accept", "application/json")
			.end(function (result) {
				console.log(result.status, result.headers, result.body);
			});
	}
}

module.exports = EnrollClient;
