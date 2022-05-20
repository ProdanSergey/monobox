class VehicleEvent {
  constructor(message) {
    this.message = message;
    this.timestamp = new Date();
  }
}

export class EngineStart extends VehicleEvent {
  constructor() {
    super("Starts the engine");
  }

  get [Symbol.toStringTag]() {
    return "EngineStart";
  }
}
export class EngineStop extends VehicleEvent {
  constructor() {
    super("Stops the engine");
  }

  get [Symbol.toStringTag]() {
    return "EngineStop";
  }
}
export class Forward extends VehicleEvent {
  constructor() {
    super("Moves forward");
  }

  get [Symbol.toStringTag]() {
    return "Forward";
  }
}
export class TurnLeft extends VehicleEvent {
  constructor() {
    super("Turns Left");
  }

  get [Symbol.toStringTag]() {
    return "TurnLeft";
  }
}
export class TurnRight extends VehicleEvent {
  constructor() {
    super("Turns right");
  }

  get [Symbol.toStringTag]() {
    return "TurnRight";
  }
}
