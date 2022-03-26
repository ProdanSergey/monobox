import { BMWFactory } from "./domain/vehicles/bmw/factory";
import { TeslaFactory } from "./domain/vehicles/tesla/factory";

const bmwM5 = BMWFactory("M5");

bmwM5.turnOn();
bmwM5.forward();
bmwM5.forward();
bmwM5.left();
bmwM5.forward();
bmwM5.forward();
bmwM5.turnOff();

bmwM5.report(console.log);

const teslaModelX = TeslaFactory("ModelX");

teslaModelX.drive(["f", "f", "f", "l", "f", "l", "f", "r", "r", "f"]);

teslaModelX.report(console.log);
