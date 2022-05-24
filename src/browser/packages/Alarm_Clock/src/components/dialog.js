import { article, BaseComponent, classnames } from "@utils/dom";

import "./dialog.styles.css";

export class Dialog extends BaseComponent {
  state = { hidden: this.props.hidden ?? true };

  open = ({ detail }) => {
    const { id } = this.props;

    if (detail === id) this.state.hidden = false;
  };

  close = ({ detail }) => {
    const { id } = this.props;

    if (detail === id) this.state.hidden = true;
  };

  onMount() {
    this.on("dialog:open", this.open);
    this.on("dialog:close", this.close);
  }

  render() {
    const { hidden } = this.state;
    const { className, children } = this.props;

    return article({ className: classnames("dialog", { ["dialog--hidden"]: hidden }, className) }, children);
  }
}
