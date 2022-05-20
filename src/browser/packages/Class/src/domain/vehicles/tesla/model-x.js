import { Computer } from "../../gadgets/computer";
import { GPS } from "../../gadgets/gps";
import { AutoPilot } from "../../gadgets/autopilot";
import { Tesla } from ".";

export class ModelX extends Tesla {}

export const ModelXFactory = () => new ModelX(new Computer(), new GPS(), new AutoPilot());
