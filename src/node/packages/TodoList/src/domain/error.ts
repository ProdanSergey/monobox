export class ValidationError extends Error {
	constructor(message: string, format?: string) {
    let validationMessage = message;

    if (format) {
      validationMessage = `${validationMessage}, Format["${format}"]`
    }

		super(validationMessage);
	}
}

export class NotFoundError extends Error {
	constructor() {
		super("Not Found");
	}
}

export class BadRequestError extends Error {
	constructor() {
		super("Bad Request");
	}
}

export class InternalError extends Error {
	constructor() {
		super("Something happened, try again...");
	}
}
