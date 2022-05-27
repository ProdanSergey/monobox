import { BaseComponent } from "../base-component";
import { div } from "../fabrics";
import { classnames } from "../utils/classnames";

import "./icon.styles.css";

export class Icon extends BaseComponent {
  render() {
    const { className, icon } = this.props;

    return div({ className: classnames("icon", className) }, [icon]);
  }
}
