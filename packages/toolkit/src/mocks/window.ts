export const mockLocalStorage = () => {
  const setItemSpy = jest.spyOn(global.Storage.prototype, "setItem");
  const getItemSpy = jest.spyOn(global.Storage.prototype, "getItem");
  const removeItemSpy = jest.spyOn(global.Storage.prototype, "removeItem");

  return {
    setItemSpy,
    getItemSpy,
    removeItemSpy,
    clearMocks: () => {
      [setItemSpy, getItemSpy, removeItemSpy].forEach((mock) => {
        mock.mockClear();
      });
    },
  };
};

export const mockAddEventListener = () => {
  const addEventListenerSpy = jest.spyOn(global, "addEventListener");

  return {
    addEventListenerSpy,
    clearMocks: () => {
      addEventListenerSpy.mockClear();
    },
  };
};
