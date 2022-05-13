import { Computer } from "../../gadgets/computer";
import { GPS } from "../../gadgets/gps";
import { BMW } from ".";

export class M5 extends BMW {}

export const M5Factory = () => new M5(new Computer(), new GPS());
