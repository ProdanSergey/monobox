export class Vehicle {
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
		this.computer.emit("forward", ({ gps }) => `move forward towards ${gps.toString()}`);
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
