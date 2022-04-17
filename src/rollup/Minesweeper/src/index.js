import { DOMRenderer } from "@utils/dom";
import "./styles/index.css";
import { App } from "./app/app";

DOMRenderer.mount(document.getElementById("root"), App);
