export const populate = (factory, amount = 10) => {
  return new Array(amount).fill(null).map(factory);
};
