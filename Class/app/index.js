class Gadget {
	set(vehicle) {
		this.vehicle = vehicle;

		return this;
	}
}

class Computer extends Gadget {
	constructor() {
		super();

		this.listeners = new Map();
		this.journal = new Map();
	}

	emit(event, log) {
		for (const [listener, type] of this.listeners) {
			if (type === event) listener(this.vehicle);
		}

		this.journal.set(new Date(), {
			event,
			message: log(this.vehicle),
		});
	}

	subscribe(event, listener) {
		this.listeners.set(listener, event);
	}

	unsubscribe(listener) {
		this.listeners.delete(listener);
	}

	toString() {
		return Array.from(this.journal);
	}
}

const GPS = (() => {
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

	class GPS extends Gadget {
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

	return GPS;
})();

class AutoPilot extends Gadget {
	constructor() {
		super();
	}

	drive(route) {
		this.vehicle.turnOn();

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

		this.vehicle.turnOff();
	}
}

class Vehicle {
	constructor(computer, gps) {
		this.computer = computer.set(this);
		this.gps = gps.set(this);
	}

	drive() {
		throw new Error("Auto pilot is out of the stock");
	}

	turnOn() {
		this.computer.emit("on", () => "start the engine");
	}

	forward() {
		this.computer.emit(
			"forward",
			({ gps }) => `move forward towards ${gps.toString()}`
		);
	}

	left() {
		this.computer.emit("left", ({ gps }) => `turn ${gps.toString()}`);
	}

	right() {
		this.computer.emit("right", ({ gps }) => `turn ${gps.toString()}`);
	}

	turnOff() {
		this.computer.emit("off", () => "shut down the engine");
	}

	report() {
		return this.computer.toString();
	}
}

class M5 extends Vehicle {
	constructor(computer, gps) {
		super(computer, gps);
	}
}

const bmw = new M5(new Computer(), new GPS(GPS.SOUTH));

bmw.turnOn();
bmw.forward();
bmw.forward();
bmw.left();
bmw.forward();
bmw.forward();
bmw.turnOff();

console.log(bmw.report());

class ModelX extends Vehicle {
	constructor(computer, gps, autoPilot) {
		super(computer, gps);

		this.autoPilot = autoPilot.set(this);
	}

	drive(route) {
		this.computer.emit("drive", () => "enable autopilot");
		this.autoPilot.drive(route);
	}
}

const modelX = new ModelX(new Computer(), new GPS(), new AutoPilot());

modelX.drive(["f", "f", "f", "l", "f", "l", "f", "r", "r", "f"]);

console.log(modelX.report());
