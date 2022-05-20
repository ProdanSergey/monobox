import { isFunction, isString } from "@utils/fn";

export class SubmitHandler {
  constructor({ form, validators, onSubmit }) {
    this.form = form;
    this.validators = validators;
    this.onSubmit = onSubmit;
  }

  handleEvent(event) {
    event.preventDefault();

    if (this.validators) {
      this.validateOnSubmit();
    }

    if (this.form.reportValidity() && this.onSubmit) {
      this.onSubmit(this.serialize());
    }
  }

  validateByACallback(key) {
    const element = this.form[key];

    const error = this.validators[key](element.value, this.serialize());

    if (error) {
      element.setCustomValidity(error);
    }
  }

  validateOnSubmit() {
    for (const key of Object.keys(this.validators).filter((key) => this.form[key])) {
      const element = this.form[key];

      if (isFunction(this.validators[key])) {
        this.validateByACallback(key);
      }

      if (isString(this.validators[key]) && !element.checkValidity()) {
        element.setCustomValidity(this.validators[key]);
      }
    }
  }

  serialize() {
    const formData = new FormData(this.form);

    return Array.from(new Set(formData.keys())).reduce(
      (state, key) => ({
        ...state,
        [key]: formData.get(key),
      }),
      {}
    );
  }
}
