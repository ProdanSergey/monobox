import "./styles/index.css";

const from = document.querySelector(".list:not([data-dropzone])");
const to = document.querySelector(".list[data-dropzone]");

const DragAndDrop = (list, dropzone) => {
  const store = new Map();

  list.addEventListener("dragstart", (event) => {
    const flakeId = new Date().getTime().toString();

    store.set(flakeId, event.target);

    event.dataTransfer.setData("text/plain", flakeId);
  });

  list.addEventListener("dragend", (event) => {
    event.preventDefault();

    console.log("end");

    store.clear();
  });

  dropzone.addEventListener("dragenter", (event) => {
    event.target.classList.add("active");
  });

  dropzone.addEventListener("dragleave", (event) => {
    event.target.classList.remove("active");
  });

  dropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    event.target.classList.remove("active");

    if (event.target.hasAttribute("data-dropzone")) {
      console.log("drop");

      const flakeId = event.dataTransfer.getData("text");

      const target = store.get(flakeId);

      target.remove();
      target.removeAttribute("draggable");
      event.target.append(target);
    }
  });
};

DragAndDrop(from, to);
