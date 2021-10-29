const oddOfTen = {
	values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

	next() {
		const value = this.values[this.current];

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

const evenOfTen = {
	values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

	*[Symbol.iterator]() {
		for (let index = 1; index < this.values.length; index += 2) {
			yield this.values[index];
		}
	}
};

const leapYears = function* (from = 1900, to = new Date().getFullYear()) {
	for (let index = from; index < to; index++) {
		if (new Date(index, 2, 0).getDate() > 28) {
			yield index;
		}
	}
};

const mutableCount = function* () {
	let index = 0, interval = 1;

	while(Infinity) {
		interval = (yield index += interval) ?? interval;
	}
};

const counter = mutableCount();

console.log(counter.next());
console.log(counter.next());
console.log(counter.next());
console.log(counter.next());
console.log(counter.next(10));
console.log(counter.next());
console.log(counter.next());
console.log(counter.next());

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const evens = function* (to = 10) {
	for (let index = 2; index < to; index += 2) {
		yield index;
	}
};

const randomRanges = function* () {
	while (Infinity) {
		yield [...evens(getRandomIntInclusive(10, 20))];
	}
};

const randomEvens = randomRanges();

console.log(randomEvens.next());
console.log(randomEvens.next());
console.log(randomEvens.next());