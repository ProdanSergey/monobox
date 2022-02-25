import { EMOJIE } from "../../../../utils/emojie";

export const odd = {
	values: EMOJIE.take(10),

	next() {
		if (this.current < this.values.length) {
			const value = this.values[this.current];

			this.current += 2;

			return { done: false, value };
		}

		return { done: true };
	},

	[Symbol.iterator]() {
		this.current = 0;
		return this;
	},
};

export const even = {
	values: EMOJIE.take(10),

	*[Symbol.iterator]() {
		for (let index = 1; index < this.values.length; index += 2) {
			yield this.values[index];
		}
	},
};
