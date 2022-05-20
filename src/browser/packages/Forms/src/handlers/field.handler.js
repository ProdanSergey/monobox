const ERROR = {
  valueMissing: "Must not be empty",
  patternMismatch: "Must match a given pattern",
};

const EVENT = {
  INPUT: "input",
  INVALID: "invalid",
};

export class FieldHandler {
  handleEvent(event) {
    switch (event.type) {
      case EVENT.INPUT:
        this.handleInput(event);
        break;
      case EVENT.INVALID:
        this.handleInvalid(event);
        break;
    }
  }

  handleInput(event) {
    const element = event.target;

    if (element.validity.customError) {
      element.setCustomValidity("");
    }

    this.findAlert(element, (alert) => {
      alert.textContent = "";
      alert.hidden = true;
    });
  }

  handleInvalid(event) {
    event.preventDefault();

    const element = event.target;

    this.findAlert(element, (alert) => {
      alert.textContent = this.mapErrorMessages(element);
      alert.hidden = false;
    });
  }

  findAlert(element, callback) {
    const alert = element.nextElementSibling;

    if (alert) callback(alert);
  }

  mapErrorMessages({ validity, validationMessage }) {
    if (validity.customError) {
      return validationMessage;
    }

    return (
      Object.keys(ERROR)
        .reduce((errors, key) => (validity[key] ? [...errors, ERROR[key]] : errors), [])
        .join() ||
      validationMessage ||
      "Unknown error"
    );
  }
}
