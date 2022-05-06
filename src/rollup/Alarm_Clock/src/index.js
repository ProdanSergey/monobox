import { DOMRenderer } from "@utils/dom";

import "./styles/fonts.css";
import "./styles/index.css";

import { App } from "./layout/app";

DOMRenderer.mount(document.getElementById("root"), App());
