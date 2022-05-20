import { BaseComponent, classnames, DOMRenderer, form, input, span } from "@utils/dom";

import "./face.styles.css";

const format = (value) => {
  return String(value).padStart(2, 0);
};

export class Face extends BaseComponent {
  render() {
    const { hours, minutes, seconds } = this.props;

    return DOMRenderer.create("time", { className: "face" }, [
      span({ className: "face__digit" }, [format(hours)]),
      span({ className: "face__separator" }, [":"]),
      span({ className: "face__digit" }, [format(minutes)]),
      span({ className: "face__digit face__seconds" }, [format(seconds)]),
    ]);
  }
}

const mapMaxValue = ({ name }) => {
  switch (name) {
    case "hours":
      return 23;
    default:
      return 59;
  }
};

const FaceInput = (name, value, className) => {
  const handleInput = ({ target }) => {
    const value = Number(target.value);

    if (isNaN(value) || value < 0) {
      target.value = format(0);
    }

    const maxValue = mapMaxValue(target);

    if (value > maxValue) {
      target.value = format(maxValue);
    }
  };

  return input({
    name,
    className: classnames("face__input", className),
    value: format(value),
    maxLength: 2,
    "@input": handleInput,
  });
};

export class EditableFace extends BaseComponent {
  submit = ({ target }) => {
    this.props.onSubmit?.(this.serialize(target));
  };

  serialize(target) {
    const formData = new FormData(target);

    return Array.from(new Set(formData.keys())).reduce(
      (state, key) => ({
        ...state,
        [key]: formData.get(key),
      }),
      {}
    );
  }

  render() {
    const { id, children } = this.props;

    return form({ id, name: id, novalidate: true, className: "face", "@submit": this.submit }, [
      FaceInput("hours", 0),
      span({ className: "face__separator" }, [":"]),
      FaceInput("minutes", 0),
      FaceInput("seconds", 0, "face__seconds"),
      ...children,
    ]);
  }
}
