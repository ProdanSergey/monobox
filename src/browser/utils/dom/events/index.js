export class SyntheticEvent extends CustomEvent {
  constructor(type, detail) {
    super(type, {
      detail,
      bubbles: true,
      cancelable: true,
      composed: true,
    });
  }
}
