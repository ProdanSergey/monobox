import { STDIN } from "@utils/stdin";
import { DATE } from "@utils/date";
import { ObjectNamespace } from "@utils/fn";

const APP = (() => {
  return {
    firstName() {
      const MIN = 5;
      const MAX = 20;

      const validate = (input) => {
        return input.length < MIN || input.length > MAX;
      };

      return STDIN.string(`Enter your first name: min length ${MIN}, max length ${MAX}`, validate);
    },
    lastName() {
      const MIN = 5;
      const MAX = 20;

      const validate = (input) => {
        return input.length < MIN || input.length > MAX;
      };

      return STDIN.string(`Enter your last name: min length ${MIN}, max length ${MAX}`, validate);
    },
    age() {
      const MIN_YEAR = 1900;
      const MAX_YEAR = new Date().getFullYear();

      const validateYear = (input) => input < MIN_YEAR || input > MAX_YEAR;

      const year = STDIN.number(`Enter your year of birth: min ${MIN_YEAR}, max ${MAX_YEAR}`, validateYear);

      const MIN_MONTH = 1;
      const MAX_MONTH = 12;

      const validateMonth = (input) => input < MIN_MONTH || input > MAX_MONTH;

      const month = STDIN.number(`Enter your month of month: min ${MIN_MONTH}, max ${MAX_MONTH}`, validateMonth);

      const MIN_DAY = 1;
      const MAX_DAY = DATE.getMaxDay(year, month);

      const validateDay = (input) => input < MIN_DAY || input > MAX_DAY;

      const day = STDIN.number(`Enter your month of month: min ${MIN_DAY}, max ${MAX_DAY}`, validateDay);

      const now = new Date();
      const birth = new Date(year, month - 1, day);
      const birthDay = new Date(now.getFullYear(), month - 1, day);

      const fullAge = now.getFullYear() - birth.getFullYear();

      if (now > birthDay) {
        return fullAge;
      }

      return fullAge - 1;
    },
  };
})();

export const populateUserData = (elements, className) => {
  const templates = elements.filter((el) => ObjectNamespace.hasProperty(APP, el.innerText) && el.closest(className));

  for (const template of templates) {
    template.innerText = APP[template.innerText]();
  }
};
