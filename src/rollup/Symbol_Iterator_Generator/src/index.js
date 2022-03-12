import { mutableCount } from "./app/mutable-count";
import { even, evenSequence } from "./app/odd-even";
import { leapYears } from "./app/leap-year";
import { range, down, up } from "./app/range";

const counter = mutableCount();

console.log(counter.next().value); // 0
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
console.log(counter.next(10).value); // 12
console.log(counter.next().value); // 22
console.log(counter.next(100).value); // 122
console.log(counter.next().value); // 222

for (const each of even) {
	console.log(each);
}

const sequence = evenSequence();

const { value: evens } = sequence.next();

console.log(evens);

for (const leapYear of leapYears(2000, 2050)) {
	console.log(leapYear);
}

let nums = [...range(0, 5)];

console.log(nums);

nums = [...down(5)];

console.log(nums);

nums = [...up(5)];

console.log(nums);
