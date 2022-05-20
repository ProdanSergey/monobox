export const STDIN = (function () {
  const hasBeenCanceled = function (value) {
    return value === null;
  };

  const asString = function (value) {
    return (value ?? "").trim();
  };

  const asNumber = function (value) {
    value = asString(value);

    return value ? Number(value) : Number.NaN;
  };

  const validate = function (value, callback) {
    return typeof callback === "function" && callback(value);
  };

  return {
    number(message, validator, forced = true) {
      let response;
      do {
        response = prompt(message);

        if (!forced && hasBeenCanceled(response)) {
          return response;
        }

        response = asNumber(response);
      } while (response !== response || validate(response, validator));

      return response;
    },
    string(message, validator, forced = true) {
      let response;
      do {
        response = prompt(message);

        if (!forced && hasBeenCanceled(response)) {
          return response;
        }

        response = asString(response);
      } while (validate(response, validator));

      return response;
    },
  };
})();
