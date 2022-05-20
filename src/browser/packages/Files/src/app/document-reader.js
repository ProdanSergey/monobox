class ReaderHandler {
  constructor(thumbnail) {
    this.thumbnail = thumbnail;
  }
  handleEvent(event) {
    if (event.type === "load") {
      this.thumbnail.src = event.target.result;
    }
  }
}

export const DocumentReader = (document, thumbnail) => {
  const reader = new FileReader();

  ["load", "error"].forEach((eventType) => reader.addEventListener(eventType, new ReaderHandler(thumbnail)));

  reader.readAsDataURL(document);

  return thumbnail;
};
