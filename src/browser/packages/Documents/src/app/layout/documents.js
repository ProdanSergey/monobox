import { BaseComponent, DOMRenderer, image, item, span, uList } from "@utils/dom";
import { BYTE } from "@utils/numeric";
import { DOCUMENT_EVENT } from "../../constants/events";

import "./documents.styles.scss";

class Thumbnail extends BaseComponent {
  thumbnailRef = DOMRenderer.createRef("thumbnail");

  handleLoad = (event) => {
    this.thumbnailRef.current.src = event.target.result;
  };

  onMount() {
    const { file } = this.props;

    const reader = new FileReader();
    reader.addEventListener("load", this.handleLoad);
    reader.readAsDataURL(file);
  }

  render() {
    const { file } = this.props;

    return image({ ref: this.thumbnailRef, className: "document__thumbnail", title: file.name, draggable: false });
  }
}

export class Documents extends BaseComponent {
  state = { files: [] };

  onMount() {
    this.on(DOCUMENT_EVENT.ADD, ({ detail: { files } }) => {
      this.state.files = [...this.state.files, ...files];
    });
  }

  renderFile(file) {
    return item(
      {
        className: "document",
      },
      [
        new Thumbnail({ file }),
        span({ className: "document__title", title: file.name }, [file.name]),
        span({}, [new BYTE(file.size).toMegabytes().toString()]),
      ]
    );
  }

  render() {
    const { files } = this.state;

    return uList({ className: "documents" }, files.map(this.renderFile));
  }
}
