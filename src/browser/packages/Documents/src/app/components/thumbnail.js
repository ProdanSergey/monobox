import { BaseComponent, classnames, div, DOMRenderer, image } from "@utils/dom";

import "./thumbnail.styles.css";

export class Thumbnail extends BaseComponent {
  imageRef = DOMRenderer.createRef("thumbnail");

  handleLoad = (event) => {
    this.imageRef.current.src = event.target.result;
  };

  onMount() {
    const { file } = this.props;

    const reader = new FileReader();
    reader.addEventListener("load", this.handleLoad);
    reader.readAsDataURL(file);
  }

  render() {
    const { file, className } = this.props;

    return div({ className: classnames("thumbnail", className) }, [
      image({ ref: this.imageRef, title: file.name, draggable: false }),
    ]);
  }
}
