/**
 * @jest-environment jsdom
 */

import { LocalStorage } from "./local-storage";
import { spyOnJSON, spyOnLocalStorage } from "../__mocks__/window";

describe("Local Storage Adapter", () => {
  const testKey = "test_key";

  const { setItemSpy, getItemSpy, removeItemSpy } = spyOnLocalStorage();

  afterEach(() => {
    localStorage.clear();
  });

  it("should throw not supported error when browser environment not defined", () => {
    const windowMock = jest.spyOn(global, "window", "get").mockReturnValue(undefined as never);

    expect(() => {
      new LocalStorage(testKey);
    }).toThrowError(/Not supported on your environment/);

    windowMock.mockRestore();
  });

  it("should throw not supported error when local storage is not supported by browser", () => {
    const windowMock = jest.spyOn(global, "localStorage", "get").mockReturnValue(undefined as never);

    expect(() => {
      new LocalStorage(testKey);
    }).toThrowError(/Not supported on your environment/);

    windowMock.mockRestore();
  });

  it("should set the value to the local storage", () => {
    const value = "test_value";

    const ls = new LocalStorage<string>(testKey);

    ls.set(value);

    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(setItemSpy).toHaveBeenCalledWith(testKey, '{"value":"test_value"}');
  });

  it("should throw exception when setting value could not be serialized", () => {
    const ls = new LocalStorage<unknown>(testKey);

    const { JSONStringifySpy } = spyOnJSON();

    JSONStringifySpy.mockImplementationOnce(() => {
      throw new Error("parsing error");
    });

    expect(() => {
      ls.set(() => void 0);
    }).toThrowError(/Value could not be serialized/);
  });

  it("should get the value from the local storage", () => {
    const value = "test_value";

    const ls = new LocalStorage<string>(testKey);

    ls.set(value);
    const persistedValue = ls.get();

    expect(getItemSpy).toHaveBeenCalledTimes(1);
    expect(getItemSpy).toHaveBeenCalledWith(testKey);
    expect(persistedValue).toBe(value);
  });

  it("should return undefined when no item found", () => {
    const ls = new LocalStorage<string>(testKey);

    expect(ls.get()).toBe(undefined);
  });

  it("should throw exception when getting value could not be serialized", () => {
    const ls = new LocalStorage<string>(testKey);

    getItemSpy.mockImplementationOnce(() => "wrong_value");

    expect(() => {
      ls.get();
    }).toThrowError(/Value could not be serialized/);
  });

  it("should remove the value from the local storage", () => {
    const value = "test_value";

    const ls = new LocalStorage<string>(testKey);

    ls.set(value);
    const persistedValue = ls.get();

    ls.remove();

    expect(removeItemSpy).toHaveBeenCalledTimes(1);
    expect(removeItemSpy).toHaveBeenCalledWith(testKey);
    expect(persistedValue).toBe(value);
    expect(ls.get()).toBe(undefined);
  });

  it("should throw not found error when there was no item found to be removed", () => {
    const ls = new LocalStorage<string>(testKey);

    expect(() => {
      ls.remove();
    }).toThrow(/Key could not be found/);
  });

  it("should subscribe a handler to localstorage:change event", () => {
    const value = "test_value";

    const ls = new LocalStorage<string>(testKey);

    const handler = jest.fn();

    ls.subscribe("change", handler);
    ls.set(value);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith({
      name: "change",
      key: testKey,
      value,
    });
  });

  it("should unsubscribe a handler from localstorage:change event", () => {
    const ls = new LocalStorage<string>(testKey);

    const handler = jest.fn();

    const value = "test_value";

    ls.subscribe("change", handler);
    ls.set(value);

    const nextValue = "next_test_value";

    ls.unsubscribe("change", handler);
    ls.set(nextValue);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should subscribe a handler to localstorage:remove event", () => {
    const value = "test_value";

    const ls = new LocalStorage<string>(testKey);

    const handler = jest.fn();

    ls.set(value);
    ls.subscribe("remove", handler);
    ls.remove();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith({
      name: "remove",
      key: testKey,
    });
  });

  it("should unsubscribe a handler from localstorage:remove event", () => {
    const value = "test_value";

    const ls = new LocalStorage<string>(testKey);

    const handler = jest.fn();

    ls.set(value);

    ls.subscribe("remove", handler);
    ls.remove();

    ls.set(value);

    ls.unsubscribe("remove", handler);
    ls.remove();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should not execute the subscribed to localstorage:remove handler when there was no item found to be removed", () => {
    const ls = new LocalStorage<string>(testKey);

    const handler = jest.fn();

    ls.subscribe("remove", handler);

    try {
      ls.remove();
    } catch (error) {
      expect(handler).toHaveBeenCalledTimes(0);
    }
  });

  it("should not execute the subscribed handler with other key", () => {
    const value = "test_value";

    const otherTestKey = "other_test_key";

    const ls = new LocalStorage<string>(testKey);
    const otherKeyInstance = new LocalStorage<string>(otherTestKey);

    const handler = jest.fn();

    ls.subscribe("change", handler);
    otherKeyInstance.set(value);

    expect(handler).toHaveBeenCalledTimes(0);
    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(setItemSpy).toHaveBeenCalledWith(otherTestKey, '{"value":"test_value"}');
  });

  it("should execute the subscribed handler when event dispatched by other instance with the same key", () => {
    const value = "test_value";

    const ls = new LocalStorage<string>(testKey);
    const otherInstance = new LocalStorage<string>(testKey);

    const handler = jest.fn();

    ls.subscribe("change", handler);
    otherInstance.set(value);

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
