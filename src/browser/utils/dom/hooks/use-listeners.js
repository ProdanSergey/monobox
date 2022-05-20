export const useListeners = () => {
  const listeners = [];

  const add = (element, eventType, handler) => {
    element.addEventListener(eventType, handler);

    listeners.push(() => {
      element.removeEventListener(eventType, handler);
    });
  };

  const clear = () => {
    while (listeners.length) {
      listeners.pop()();
    }
  };

  return {
    add,
    clear,
  };
};
