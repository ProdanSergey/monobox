import { BaseComponent, button, classnames } from "@utils/dom";
import { Icon } from "./icon";

import "./button.style.scss";

export class ButtonWithIcon extends BaseComponent {
  render() {
    const { icon, children, className, onClick, ...attributes } = this.props;

    return button({ "@click": onClick, className: classnames("button", className), ...attributes }, [
      new Icon({ icon, className: "button__icon" }, [children]),
    ]);
  }
}
