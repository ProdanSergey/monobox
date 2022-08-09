type AnyObject = Record<PropertyKey, unknown>;

type EachCallback<T extends AnyObject> = (key: keyof T, value: T[keyof T], index: number, target: T) => void;

export const each = <T extends AnyObject>(target: T, predicate: EachCallback<T>): void => {
  Object.keys(target).forEach((key: keyof T, index) => {
    predicate(key, target[key], index, target);
  });
};

type FilterPredicate<T extends AnyObject> = (key: keyof T, value: T[keyof T], index: number, target: T) => boolean;

export const filter = <T extends AnyObject>(target: T, predicate: FilterPredicate<T>): Partial<T> => {
  const result: Partial<T> = {};

  each<T>(target, (key, value, index, target) => {
    if (predicate(key, value, index, target)) {
      result[key] = value;
    }
  });

  return result;
};

export const pick = <T extends AnyObject, U extends keyof T>(target: T, keys: Array<U>): Pick<T, U> => {
  const result: Partial<T> = {};

  each<T>(target, (key, value) => {
    if (keys.includes(key as U)) {
      result[key] = value;
    }
  });

  return result as Pick<T, U>;
};
