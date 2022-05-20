import { Gadget, TYPES } from "../gadget";

export class AutoPilot extends Gadget {
  constructor() {
    super(TYPES.AUTOPILOT);
  }

  drive(route) {
    this.vehicle.turnOn();
    this.vehicle.journal.for(this).info().message("Starts a ride");

    for (const statement of route) {
      switch (statement) {
        case "l": {
          this.vehicle.left();
          break;
        }
        case "r": {
          this.vehicle.right();
          break;
        }
        default:
          this.vehicle.forward();
          break;
      }
    }

    this.vehicle.journal.for(this).info().message("Completes a ride");
    this.vehicle.turnOff();
  }
}
