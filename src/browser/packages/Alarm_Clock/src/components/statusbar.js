import { BaseComponent, item, uList } from "@utils/dom";

import "./statusbar.styles.scss";

export class StatusBar extends BaseComponent {
  renderItem(child) {
    return item({ className: "statusbar__item" }, [child]);
  }

  render() {
    const { children } = this.props;

    return uList({ className: "statusbar" }, children.map(this.renderItem));
  }
}
