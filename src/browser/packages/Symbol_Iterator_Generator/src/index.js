import { mutableCount } from "./app/mutable-count";
import { even, evenSequence } from "./app/odd-even";

const counter = mutableCount();

console.log(counter.next().value); // 0
console.log(counter.next().value); // 1
console.log(counter.next(10).value); // 11
console.log(counter.next().value); // 21
console.log(counter.next().value); // 31
console.log(counter.next(100).value); // 131

for (const each of even) {
  console.log(each);
}

const sequence = evenSequence(10, 20);

let i = 20;

while (i-- > 0) {
  const { value } = sequence.next();

  console.log(value);
}

// for (const leapYear of leapYears(2000, 2050)) {
// 	console.log(leapYear);
// }

// let nums = [...range(0, 5)];

// console.log(nums);

// nums = [...down(5)];

// console.log(nums);

// nums = [...up(5)];

// console.log(nums);
