import { v4 as uniqid } from "uuid";

const useStore = () => {
  const store = new Map();

  const getElements = async ({ dataTransfer }) => {
    const elements = Array.from(dataTransfer.items)
      .filter((item) => item.kind === "string")
      .map(
        (item) =>
          new Promise((resolve) => {
            try {
              item.getAsString((value) => {
                store.has(value) ? resolve(store.get(value)) : resolve(null);
              });
            } catch {
              resolve(null);
            }
          })
      );

    return Promise.all(elements);
  };

  const setElement = ({ target, dataTransfer }) => {
    const id = uniqid();
    dataTransfer.items.add(id, "text/plain");
    store.set(id, target);
  };

  const clear = ({ dataTransfer }) => {
    dataTransfer.items.clear();
    store.clear();
  };

  return {
    getElements,
    setElement,
    clear,
  };
};

export const useDragAndDrop = () => {
  const store = useStore();

  const dragIn = (draggable) => {
    draggable.setAttribute("data-dragged", "");
  };

  const dragOut = (draggable) => {
    draggable.removeAttribute("data-dragged");
  };

  const hoverIn = (draggable) => {
    draggable.setAttribute("data-hover", "");
  };

  const hoverOut = (draggable) => {
    draggable.removeAttribute("data-hover");
  };

  const dragStart = (event) => {
    const { target } = event;

    dragIn(target);
  };

  const dragEnd = (event) => {
    const { target } = event;

    dragOut(target);
  };

  const dragOver = (event) => {
    event.preventDefault();

    const { target } = event;

    if (!target.hasAttribute("data-hover")) {
      hoverIn(target);
    }
  };

  const dragLeave = (event) => {
    const { target } = event;

    if (target.hasAttribute("data-hover")) {
      hoverOut(target);
    }
  };

  const drop = async (event) => {
    event.preventDefault();
    const { target } = event;

    hoverOut(target);
  };

  return (event) => {
    switch (event.type) {
      case "dragstart":
        dragStart(event);
        break;
      case "dragend":
        dragEnd(event);
        break;
      case "dragover":
        dragOver(event);
        break;
      case "dragleave":
        dragLeave(event);
        break;
      case "drop":
        drop(event);
        break;
    }

    return {
      store,
    };
  };
};
