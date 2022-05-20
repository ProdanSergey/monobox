import { DATE } from "@utils/date";

export const leapYears = function* (from = 1900, to = new Date().getFullYear()) {
  for (let year = from; year < to; year++) {
    if (DATE.isLeapYear(year)) yield year;
  }
};
