import { isFunction, isObject, ObjectNamespace } from "./fn";

class StateError extends Error {}

export class State {
  constructor(init = {}) {
    if (!isObject(init)) {
      throw new StateError("State must be an object");
    }

    Object.assign(this, init);
  }

  subscribe(observer, options) {
    if (!isFunction(observer)) {
      return new StateError("Observer must be a function");
    }

    return new Proxy(this, {
      set(target, key, value) {
        const { before, after } = { after: true, ...options };

        try {
          if (before) {
            if (observer(target, key, value) === false) {
              return false;
            }

            return Reflect.set(target, key, value);
          }

          if (after) {
            const backup = isObject(value) ? ObjectNamespace.deepCopy(value) : value;

            Reflect.set(target, key, value);

            if (observer(target, key, value) === false) {
              Reflect.set(target, key, backup);

              return false;
            }

            return true;
          }

          return Reflect.set(target, key, value);
        } catch (error) {
          throw new StateError(error.message);
        }
      },
    });
  }
}
