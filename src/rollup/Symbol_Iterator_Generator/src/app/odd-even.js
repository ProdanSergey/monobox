import { RANDOM } from "@utils/random";
import { EMOJI } from "@utils/emoji";
import { Numeric } from "@utils/numeric";

export const odd = {
	values: EMOJI.take(10),

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
	values: EMOJI.take(10),

	*[Symbol.iterator]() {
		for (let index = 1; index < this.values.length; index += 2) {
			yield this.values[index];
		}
	},
};

export const evens = function* (start = 2, to = start + 20) {
	start = new Numeric(start).isOdd() ? ++start : start;

	for (let index = start; index < to; index += 2) {
		yield index;
	}
};

export const evenSequence = function* (maxLength = 20) {
	if (maxLength < 2) {
		throw new Error("Min length is 2");
	}
	while (Infinity) {
		const start = RANDOM.integer(2, maxLength);
		const end = RANDOM.integer(start + 2, start + maxLength);

		yield [...evens(start, end)];
	}
};
