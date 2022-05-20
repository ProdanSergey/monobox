import { TurnLeft, TurnRight } from "../events";
import { Gadget, TYPES } from "../gadget";

const NORTH = "north";
const WEST = "west";
const SOUTH = "south";
const EAST = "east";

const COMPASS = {
  [NORTH]: {
    left: WEST,
    right: EAST,
  },
  [WEST]: {
    left: SOUTH,
    right: NORTH,
  },
  [SOUTH]: {
    left: EAST,
    right: WEST,
  },
  [EAST]: {
    left: NORTH,
    right: SOUTH,
  },
};

export class GPS extends Gadget {
  constructor(pointer = NORTH) {
    super(TYPES.GPS);

    this.pointer = pointer;
  }

  set(vehicle) {
    vehicle.computer.subscribe(TurnRight, () => this.pointToRight());
    vehicle.computer.subscribe(TurnLeft, () => this.pointToLeft());

    return super.set(vehicle);
  }

  pointToRight() {
    this.pointer = COMPASS[this.pointer].right;
    this.report(`New direction: ${this.pointer}`);
  }

  pointToLeft() {
    this.pointer = COMPASS[this.pointer].left;
    this.report(`New direction: ${this.pointer}`);
  }

  report(message) {
    this.vehicle.journal.for(this).info().message(message);
  }

  static NORTH = NORTH;
  static WEST = WEST;
  static SOUTH = SOUTH;
  static EAST = EAST;
}
