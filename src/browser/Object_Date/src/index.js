import { DATE } from "@utils/date";

const from = "2022-02-19T19:14:54";
const to = "2022-02-19T19:15:00";

const diff = DATE.diff(from, to);

console.log(diff.y);
console.log(diff.M);
console.log(diff.d);
console.log(diff.h);
console.log(diff.m);
console.log(diff.s);
console.log(diff.ms);
