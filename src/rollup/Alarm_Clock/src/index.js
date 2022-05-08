import { DOMRenderer } from "@utils/dom";
import { App } from "./layout/app";

DOMRenderer.mount(document.getElementById("root"), new App());
