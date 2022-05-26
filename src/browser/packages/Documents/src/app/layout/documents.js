import { BaseComponent, item, span, uList, useDragAndDrop } from "@utils/dom";
import { BYTE } from "@utils/numeric";
import { Thumbnail } from "../components/thumbnail";
import { DOCUMENT_EVENT } from "../../constants/events";

import "./documents.styles.scss";

export class Documents extends BaseComponent {
  state = { files: [] };

  setFiles(...files) {
    this.state.files = [...this.state.files, ...files];
  }

  onMount() {
    this.on(DOCUMENT_EVENT.ADD, ({ detail: { files } }) => {
      this.setFiles(...files);
    });
  }

  dragAndDrop = useDragAndDrop();

  drop = (event) => {
    this.dragAndDrop(event);

    this.setFiles(...event.dataTransfer.files);
  };

  renderFile(file) {
    return item(
      {
        className: "document",
      },
      [
        new Thumbnail({ file, className: "document_thumbnail" }),
        span({ className: "document__title", title: file.name }, [file.name]),
        span({}, [new BYTE(file.size).toMegabytes().toString()]),
      ]
    );
  }

  render() {
    const { files } = this.state;

    return uList(
      { className: "documents", "@drop": this.drop, "@dragover": this.dragAndDrop },
      files.map(this.renderFile)
    );
  }
}
