'use strict';

class APIError {
	constructor(response) {
		this.status = response.status === 200 ? 400 : response.status;
		this.message = response.message || response.body && (response.body.message || response.body.error || response.body.errors);
	}
}

module.exports = APIError;