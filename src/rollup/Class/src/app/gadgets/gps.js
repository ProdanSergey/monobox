import { Gadget } from "../gadget";

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
	constructor(pointer = NORTH, map = {}) {
		super();

		this.pointer = pointer;
		this.map = map;
	}

	set(vehicle) {
		vehicle.computer.subscribe("right", () => this.pointToRight());
		vehicle.computer.subscribe("left", () => this.pointToLeft());

		return super.set(vehicle);
	}

	pointToRight() {
		this.pointer = COMPASS[this.pointer].right;
	}

	pointToLeft() {
		this.pointer = COMPASS[this.pointer].left;
	}

	toString() {
		return this.map[this.pointer] ?? this.pointer;
	}

	static NORTH = NORTH;
	static WEST = WEST;
	static SOUTH = SOUTH;
	static EAST = EAST;
}
