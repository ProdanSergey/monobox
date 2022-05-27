import { DOMRenderer } from "@utils/dom";
import { App } from "./app/app";

const root = document.getElementById("root");

DOMRenderer.mount(root, App);
