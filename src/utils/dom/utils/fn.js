import { BaseComponent } from "../base-component";

export const isComponent = (v) => v instanceof BaseComponent;
export const isFnComponent = (v) => v instanceof Function;
export const isElement = (v) => v instanceof HTMLElement;
export const isFragment = (v) => v instanceof DocumentFragment;
export const isEventHandler = (v) => v.startsWith("@");
