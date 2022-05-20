import { button, classnames } from "@utils/dom";

import "./button.styles.scss";

export const Button = ({ type, label, className, onClick }) => {
  return button(
    {
      className: classnames("button", { [`button--${type}`]: type }, className),
      "@click": onClick,
    },
    [label]
  );
};
