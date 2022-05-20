import { BaseComponent, classnames, div } from "@utils/dom";

import "./icon.styles.css";

export class Icon extends BaseComponent {
  render() {
    const { className, icon } = this.props;

    return div({ className: classnames("icon", className) }, [icon]);
  }
}
