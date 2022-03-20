const wrap = (depth, value = "@") => (depth <= 0 ? value : wrap(depth - 1, { value }));

const wrapped = wrap(5);

console.log(JSON.stringify(wrapped, null, 4));

const isObject = (t) => typeof t === "object" && !Array.isArray(t) && t !== null;

const unwrap = (value, key = "value") => (!isObject(value) ? value : unwrap(value[key]));

const unwrapped = unwrap(wrapped);

console.log(unwrapped);
