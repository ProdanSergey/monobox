import { DOMRenderer } from "@utils/dom";
import { App } from "./app/app";

DOMRenderer.mount(document.getElementById("root"), App());
