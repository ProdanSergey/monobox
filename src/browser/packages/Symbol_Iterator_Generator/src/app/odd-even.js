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

export const evens = function* (from = 2, to = 20) {
  let even = new Numeric(from).isOdd() ? from + 1 : from;

  do yield even;
  while ((even += 2) <= to);
};

export const evenSequence = function* (maxCount = 20, maxFrom = 2000) {
  while (Infinity) {
    const from = RANDOM.integer(2, maxFrom);
    const to = RANDOM.integer(from, from + 2 * maxCount - 2);

    yield [...evens(from, to)];
  }
};
