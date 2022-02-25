import { even } from "./app/odd-even";

for (const each of even) {
	console.log(each);
}

// const leapYears = function* (from = 1900, to = new Date().getFullYear()) {
// 	for (let index = from; index < to; index++) {
// 		if (new Date(index, 2, 0).getDate() > 28) {
// 			yield index;
// 		}
// 	}
// };

// const mutableCount = function* () {
// 	let count = -1,
// 		interval = 1;

// 	console.log("start");

// 	while (Infinity) {
// 		console.log("{before}", "interval", interval);
// 		interval = (yield (count += interval)) ?? interval;
// 		console.log("{after}", "interval", interval);
// 	}
// };

// const counter = mutableCount();

// console.log(counter.next().value); // 0
// console.log(counter.next().value); // 1
// console.log(counter.next().value); // 2
// console.log(counter.next(10).value); // 12
// console.log(counter.next().value); // 22
// console.log(counter.next(100).value); // 122
// console.log(counter.next().value); // 222

// function getRandomIntInclusive(min, max) {
// 	min = Math.ceil(min);
// 	max = Math.floor(max);
// 	return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
// }

// const evens = function* (start = 2, to = start + 20) {
// 	for (let index = start; index < to; index++) {
// 		if (index % 2 === 0) {
// 			yield index;
// 		}
// 	}
// };

// const randomRanges = function* () {
// 	while (Infinity) {
// 		const start = getRandomIntInclusive(2, 20);
// 		const end = getRandomIntInclusive(start + 2, start + 20);

// 		yield [...evens(start, end)];
// 	}
// };

// const randomEvens = randomRanges();
