import { BaseComponent, classnames } from "@utils/dom";
import homeIcon from "../../assets/icons/home.svg";
import { ButtonWithIcon } from "../../components/button";
import { DIALOG_EVENT } from "../../constants/events";

import "./home.styles.css";

export class HomeAction extends BaseComponent {
  click = () => {
    this.emit(DIALOG_EVENT.CLOSE, this.props.id);
  };

  render() {
    const { icon = homeIcon(), className } = this.props;

    return new ButtonWithIcon({
      icon,
      onClick: this.click,
      className: classnames("home-action", className),
    });
  }
}
