const isObject = (v) => typeof v === "object" && !Array.isArray(v) && v !== null;
const isFunction = (v) => typeof v === "function";
const isString = (v) => typeof v === "string";
const isFalsy = (v) => !v;
const isTruthy = (v) => !isFalsy(v);
const isNill = (v) => v === undefined || v === null;
const isNullish = (v) => isNill(v) || v === false || (isString(v) && v.trim().length === 0);
const not =
  (fn) =>
  (...args) =>
    !fn.call(null, ...args);

const compose =
  (...fns) =>
  (arg) =>
    fns.reduceRight((prevArg, fn) => fn(prevArg), arg);

const template = (items, mapper) => {
  return items.reduce((html, item) => (html += mapper(item)), "");
};
class ArrayNamespace {
  static groupBy(v, ...predicates) {
    return Array.from(v).reduce(
      (buckets, current) => {
        const bucketIndex = predicates.findIndex((predicate) => {
          return compose(isTruthy, predicate)(current);
        });

        buckets[bucketIndex >= 0 ? bucketIndex : buckets.length - 1].push(current);

        return buckets;
      },
      new Array(predicates.length + 1).fill(null).map(() => [])
    );
  }
}

class ObjectNamespace {
  static deepCopy(v) {
    return JSON.parse(JSON.stringify(v));
  }

  static pick(v, keys) {
    return ObjectNamespace.pickBy(v, ({ key }) => keys.includes(key));
  }

  static pickBy(v, cb) {
    return Object.entries(v).reduce((acc, [key, value]) => {
      return cb({ key, value }) ? { ...acc, [key]: value } : acc;
    }, {});
  }

  static pickTruthy(v) {
    return ObjectNamespace.pickBy(v, ({ value }) => value);
  }

  static truthyKeys(v) {
    return Object.keys(ObjectNamespace.pickTruthy(v));
  }

  static truthyValues(v) {
    return Object.values(ObjectNamespace.pickTruthy(v));
  }

  static truthy(v) {
    return Object.entries(ObjectNamespace.pickTruthy(v));
  }

  static hasProperty(v, key) {
    return Object.prototype.hasOwnProperty.call(v, key);
  }

  static forEach(v, cb) {
    Object.keys(v).forEach((key, index) => {
      cb(key, v[key], index, v);
    });
  }

  static map(v, cb) {
    return Object.keys(v).reduce((acc, key, index) => {
      acc[key] = cb(key, v[key], index, v);

      return acc;
    }, {});
  }
}

export {
  ArrayNamespace,
  ObjectNamespace,
  isObject,
  isFunction,
  isString,
  isFalsy,
  isTruthy,
  isNill,
  isNullish,
  template,
  compose,
  not,
};
