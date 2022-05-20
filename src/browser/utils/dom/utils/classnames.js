import { isObject, isTruthy, ObjectNamespace } from "@utils/fn";

export const classnames = (...classNames) => {
  return classNames
    .reduce((acc, current) => {
      if (isObject(current)) {
        return [...acc, ...ObjectNamespace.truthyKeys(current)];
      }

      if (Array.isArray(current)) {
        return [...acc, ...current];
      }

      if (isTruthy(current)) {
        return [...acc, current];
      }

      return acc;
    }, [])
    .join(" ");
};
