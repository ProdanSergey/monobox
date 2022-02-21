import dayjs from "dayjs";
import { Controller } from "./models/controller";

import "./styles/main.scss";

import cat from "./assets/cat.jpeg";

console.log(dayjs().format());

const controller = new Controller("/");

controller.handle();

document.body.style.backgroundImage = `url(${cat})`;
