export const at = (target, index) => {
  if (!target) {
    return undefined;
  }

  if (index < 0) {
    return target[target.length + index];
  }

  return target[index];
};
