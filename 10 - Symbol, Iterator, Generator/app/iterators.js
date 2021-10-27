const evenValues = {
	values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],

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
		this.current = 1;
		return this;
	},
};

const oddValues = {
	values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],

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

for (const value of oddValues) {
	console.log(value);
}

const odds = [...oddValues];
const evens = [...evenValues];

console.log(odds);
console.log(evens);

const evenGenerator = function* (to = Infinity) {
	for (let start = 2; start <= to; start += 2) {
		yield start;
	}
};

const oddGenerator = function* (to = Infinity) {
	for (let start = 1; start <= to; start += 2) {
		yield start;
	}
};

for (const value of evenGenerator(49)) {
	console.log(value);
}

for (const value of oddGenerator(30)) {
	console.log(value);
}
