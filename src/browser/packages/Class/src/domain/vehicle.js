import { EngineStart, EngineStop, Forward, TurnLeft, TurnRight } from "./events";
import { Journal } from "./journal";

export class Vehicle {
  constructor(...gadgets) {
    this.journal = new Journal(this);

    this.plug(gadgets);
  }

  plug(gadgets) {
    for (const gadget of gadgets) {
      this[gadget.type] = gadget.set(this);
      this.journal.info().message(`${gadget.type} plugs in successfully`);
    }
  }

  turnOn() {
    this.computer.produce(new EngineStart());
  }

  forward() {
    this.computer.produce(new Forward());
  }

  left() {
    this.computer.produce(new TurnLeft());
  }

  right() {
    this.computer.produce(new TurnRight());
  }

  turnOff() {
    this.computer.produce(new EngineStop());
  }

  report(logger) {
    logger(this.journal.read());
  }
}
