import { BaseComponent, image } from "@utils/dom";

import "./image.styles.css";

export class ImageComponent extends BaseComponent {
  render() {
    const { src } = this.props;

    return image({
      className: "sc-image",
      src,
    });
  }
}
