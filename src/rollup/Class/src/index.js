import { AutoPilot } from "./app/gadgets/autopilot";
import { Computer } from "./app/gadgets/computer";
import { GPS } from "./app/gadgets/gps";
import { Vehicle } from "./app/vehicle";

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
