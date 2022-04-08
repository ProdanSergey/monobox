const isObject = (v) => typeof v === "object" && !Array.isArray(v) && v !== null;
const isFunction = (v) => typeof v === "function";
const isFalsy = (v) => !v;
const isTruthy = (v) => !isFalsy(v);

const compose =
	(...fns) =>
	(arg) =>
		fns.reduceRight((prevArg, fn) => fn(prevArg), arg);

export { isObject, isFunction, isFalsy, isTruthy, compose };
