export const isUndefined = (target: unknown): target is undefined => {
  return target === void 0;
};
