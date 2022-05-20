export const mutableCount = function* () {
  let count = -1,
    interval = 1;

  console.log("start");

  while (Infinity) {
    console.log("{before}", "interval", interval);
    interval = (yield (count += interval)) ?? interval;
    console.log("{after}", "interval", interval);
  }
};
