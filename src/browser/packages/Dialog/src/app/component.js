class DOMError extends Error {
  name = "DOMError";
}
export class BaseComponent {
  constructor(container, meta = {}) {
    if (!(container instanceof HTMLElement)) {
      throw new DOMError("Container must be an HTML element");
    }

    this.container = container;
    this.meta = meta;
  }
}
