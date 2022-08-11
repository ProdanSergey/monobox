const bundle = <T extends Record<string, jest.SpyInstance>>(
  spyMap: T
): T & {
  spyClear: CallableFunction;
  spyRestore: CallableFunction;
  spyReset: CallableFunction;
} => {
  const spies = Object.values(spyMap);

  return {
    ...spyMap,
    spyClear: () => {
      spies.forEach((spy) => {
        spy.mockClear();
      });
    },
    spyReset: () => {
      spies.forEach((spy) => {
        spy.mockReset();
      });
    },
    spyRestore: () => {
      spies.forEach((spy) => {
        spy.mockRestore();
      });
    },
  };
};

export const spyOnLocalStorage = () => {
  const setItemSpy = jest.spyOn(global.Storage.prototype, "setItem");
  const getItemSpy = jest.spyOn(global.Storage.prototype, "getItem");
  const removeItemSpy = jest.spyOn(global.Storage.prototype, "removeItem");
  const clearSpy = jest.spyOn(global.Storage.prototype, "clear");

  return bundle({ setItemSpy, getItemSpy, removeItemSpy, clearSpy });
};

export const spyOnAddEventListener = () => {
  const addEventListenerSpy = jest.spyOn(global, "addEventListener");

  return bundle({ addEventListenerSpy });
};

export const spyOnJSON = () => {
  const JSONParseSpy = jest.spyOn(global.JSON, "parse");
  const JSONStringifySpy = jest.spyOn(global.JSON, "stringify");

  return bundle({ JSONParseSpy, JSONStringifySpy });
};
