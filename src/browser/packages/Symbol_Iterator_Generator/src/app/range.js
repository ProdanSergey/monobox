export const range = function* (start = 0, end = 0) {
  while (start <= end) yield start++;
};

export const down = function* (start = 0) {
  while (start >= 0) {
    yield start--;
  }
};

export const up = function* (end = 0) {
  let start = 0;
  while (start <= end) {
    yield start++;
  }
};
