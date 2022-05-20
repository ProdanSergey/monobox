import { Gadget, TYPES } from "../gadget";

export const Computer = (() => {
  const subscribers = new WeakMap();

  const handlers = (type) => {
    return subscribers.get(type) ?? new Set();
  };

  class Computer extends Gadget {
    constructor() {
      super(TYPES.COMPUTER);
    }

    produce(event) {
      this.vehicle.journal.info().report(event);

      for (const handler of handlers(event.constructor)) {
        handler(this.vehicle);
      }
    }

    subscribe(type, handler) {
      subscribers.set(type, handlers(type).add(handler));
      this.vehicle.journal.for(this).info().message(`Successfully subscribes "${type.prototype.toString()}"`);
    }
  }

  return Computer;
})();
