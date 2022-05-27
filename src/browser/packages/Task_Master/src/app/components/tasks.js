import { BaseComponent, DOMRenderer, useDragAndDrop } from "@utils/dom";
import { template } from "@utils/fn";

import "./tasks.styles.scss";

export class Tasks extends BaseComponent {
  state = { items: [] };

  dragAndDrop = useDragAndDrop();

  dragEnd = (event) => {
    const { store } = this.dragAndDrop(event);
    store.clear(event);
  };

  dragStart = (event) => {
    const { store } = this.dragAndDrop(event);
    store.setElement(event);
  };

  drop = async (event) => {
    const { store } = this.dragAndDrop(event);

    const { currentTarget, target: droppedTarget } = event;

    const [draggedTarget] = await store.getElements(event);

    if ([currentTarget, draggedTarget].some((target) => target === droppedTarget)) return;

    const indexOf = (child) => Array.from(currentTarget.children).indexOf(child);

    indexOf(draggedTarget) < indexOf(droppedTarget)
      ? droppedTarget.after(draggedTarget)
      : droppedTarget.before(draggedTarget);
  };

  onMount() {
    this.on("task:add", ({ detail }) => {
      this.state.items = [...this.state.items, detail];
    });
  }

  render() {
    const { items } = this.state;

    return DOMRenderer.hydrate(
      `
        <section class="tasks">
          <div class="container">
            <ul @drop="drop" @dragover="dragover" @dragleave="dragleave">
              ${template(
                items,
                ({ value }) =>
                  `<li class="task" draggable="true" @dragstart="dragstart" @dragend="dragend">${value}</li>`
              )}
            </ul>
          </div>
        </section>
      `,
      {
        dragover: this.dragAndDrop,
        dragleave: this.dragAndDrop,
        drop: this.drop,
        dragstart: this.dragStart,
        dragend: this.dragEnd,
      }
    );
  }
}
