import { Gadget } from "../gadget";

export class AutoPilot extends Gadget {
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
