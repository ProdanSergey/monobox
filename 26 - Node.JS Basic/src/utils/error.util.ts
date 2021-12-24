export class NotFoundError extends Error {
	constructor() {
		super('Not Found');
	}
}

export class NoContentError extends Error {
	constructor() {
		super('No Content');
	}
}

export class BadRequestError extends Error {
	constructor() {
		super('Bad Request');
	}
}

export class InternalError extends Error {
	constructor() {
		super('Something happened, try again...');
	}
}