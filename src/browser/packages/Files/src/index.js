import { image, item, span } from "@utils/dom";
import { BYTE } from "@utils/numeric";

import "./styles/index.css";

import { store } from "./app/store";
import { DocumentDropzone } from "./app/document-dropzone";
import { DocumentInput } from "./app/document-input";
import { DocumentReader } from "./app/document-reader";

const dropzone = document.getElementById("dropzone");
const file = document.getElementById("file");

const render = () => {
  dropzone.innerHTML = "";

  for (const file of store.values()) {
    const thumbnail = DocumentReader(
      file,
      image({ className: "document__thumbnail", title: file.name, draggable: false })
    );

    const listItem = item(
      {
        className: "document",
      },
      [
        thumbnail,
        span({ className: "document__title", title: file.name }, [file.name]),
        span({}, [new BYTE(file.size).toMegabytes().toString()]),
      ]
    );

    dropzone.append(listItem);
  }
};

DocumentDropzone(dropzone, render);
DocumentInput(file, render);
