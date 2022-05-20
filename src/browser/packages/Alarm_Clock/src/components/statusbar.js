import { BaseComponent, div, item, uList } from "@utils/dom";

import "./statusbar.styles.css";

export class StatusBar extends BaseComponent {
  render() {
    const { children } = this.props;

    return div({ className: "statusbar" }, [
      uList(
        { className: "statusbar__list" },
        children.map((child) => item({ className: "statusbar__item" }, [child]))
      ),
    ]);
  }
}
