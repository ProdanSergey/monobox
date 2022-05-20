import { store } from "./store";

class DropzoneHandler {
  constructor(dropzone, onEnter, onDrop) {
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventType) => {
      dropzone.addEventListener(eventType, this.preventDefault, false);
    });

    dropzone.addEventListener("dragenter", ({ dataTransfer }) => onEnter(this, dataTransfer));
    dropzone.addEventListener("drop", ({ dataTransfer }) => onDrop(this, dataTransfer));

    ["dragleave", "drop"].forEach((eventType) => dropzone.addEventListener(eventType, () => this.clearInvalid()));

    this.dropzone = dropzone;
  }

  clearInvalid() {
    if (this.isInvalid()) {
      this.dropzone.removeAttribute("aria-invalid");
    }
  }

  setInvalid() {
    this.dropzone.setAttribute("aria-invalid", "");
  }

  isInvalid() {
    return this.dropzone.hasAttribute("aria-invalid");
  }

  preventDefault(event) {
    event.preventDefault();
  }
}

export const DocumentDropzone = (dropzone, render) => {
  return new DropzoneHandler(
    dropzone,
    (dropzone, { items }) => {
      if (Array.from(items).some(({ type }) => !type.startsWith("image/"))) {
        dropzone.setInvalid();
      }
    },
    (dropzone, { files }) => {
      if (dropzone.isInvalid()) {
        return;
      }

      for (const file of files) {
        store.set(file.name, file);
      }

      render();
    }
  );
};
