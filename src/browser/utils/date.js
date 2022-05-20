export const Difference = (ms, s, m, h, d, M, y) => {
  return {
    ms,
    s,
    m,
    h,
    d,
    M,
    y,
  };
};

export const DATE = (function () {
  const ZODIAC = [
    [19, "Capricorn", "♑"], // 1
    [18, "Aquarius", "♒"], // 2
    [20, "Pisces", "♓"], // 3
    [19, "Aries", "♈"], // 4
    [20, "Taurus", "♉"], // 5
    [20, "Gemini", "♊"], // 6
    [22, "Cancer", "♋"], // 7
    [22, "Leo", "♌"], // 8
    [22, "Virgo", "♍"], // 9
    [22, "Libra", "♎"], // 10
    [21, "Scorpio", "♏"], // 11
    [21, "Sagittarius", "♐"], // 12
  ];

  const MS_IN_A_DAY = 1000 * 60 * 60 * 24;
  const MS_IN_A_HOUR = 1000 * 60 * 60;
  const MS_IN_A_MINUTE = 1000 * 60;
  const MS_IN_A_SECOND = 1000;

  return {
    diff(from, to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      if (toDate < fromDate) {
        throw new RangeError("to can not be less then from");
      }

      const diff = toDate.getTime() - fromDate.getTime();

      let ms, s, m, h, d, M, y;

      y = toDate.getFullYear() - fromDate.getFullYear();
      M = y * 12 + Math.abs(fromDate.getMonth() - toDate.getMonth());
      d = Math.round(diff / MS_IN_A_DAY);
      h = Math.round(diff / MS_IN_A_HOUR);
      m = Math.round(diff / MS_IN_A_MINUTE);
      s = Math.round(diff / MS_IN_A_SECOND);
      ms = toDate.getTime() - fromDate.getTime();

      return Difference(ms, s, m, h, d, M, y);
    },
    isLeapYear(year) {
      return this.getMaxDay(year, 2) > 28;
    },
    getMaxDay(year, month) {
      return new Date(year, month, 0).getDate();
    },
    getZodiac(month, day) {
      if (month && day) {
        const [lastDay, ...zodiac] = ZODIAC[month - 1];

        if (day <= lastDay) {
          return zodiac;
        } else {
          return (month < ZODIAC.length ? ZODIAC[month] : ZODIAC[0]).slice(1);
        }
      }

      return [];
    },
    getTime() {
      const moment = new Date();

      return {
        h: moment.getHours(),
        H: moment.getHours() % 12,
        m: moment.getMinutes(),
        s: moment.getSeconds(),
        ms: moment.getMilliseconds(),
      };
    },
  };
})();
