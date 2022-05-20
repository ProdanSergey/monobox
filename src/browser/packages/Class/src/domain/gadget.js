export const TYPES = {
  GPS: "gps",
  COMPUTER: "computer",
  AUTOPILOT: "autopilot",
};

export class Gadget {
  constructor(type) {
    this.type = type;
  }

  set(vehicle) {
    this.vehicle = vehicle;

    return this;
  }
}
