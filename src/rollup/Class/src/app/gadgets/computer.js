import { Gadget } from "../gadget";

export class Computer extends Gadget {
	constructor() {
		super();

		this.listeners = new Map();
		this.journal = new Map();
	}

	emit(event, log) {
		for (const [listener, type] of this.listeners) {
			if (type === event) listener(this.vehicle);
		}

		this.journal.set(new Date(), {
			event,
			message: log(this.vehicle),
		});
	}

	subscribe(event, listener) {
		this.listeners.set(listener, event);
	}

	unsubscribe(listener) {
		this.listeners.delete(listener);
	}

	toString() {
		return Array.from(this.journal);
	}
}
