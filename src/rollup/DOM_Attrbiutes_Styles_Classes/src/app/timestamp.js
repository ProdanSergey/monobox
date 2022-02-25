export class Timestamp {
	constructor() {
		this.moment = new Date();
	}

	toISOString() {
		return this.moment.toISOString();
	}

	toString() {}
}
