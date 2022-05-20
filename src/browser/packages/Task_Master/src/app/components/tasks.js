import { BaseComponent, DOMRenderer, useDragAndDrop } from "@utils/dom";
import { template } from "@utils/fn";

import "./tasks.styles.scss";

export class Tasks extends BaseComponent {
  state = { items: [] };

  onRef = useDragAndDrop(({ currentTarget, droppedTarget, draggedTarget }) => {
    if ([currentTarget, draggedTarget].some((target) => target === droppedTarget)) return;

    const indexOf = (child) => Array.from(currentTarget.children).indexOf(child);

    indexOf(draggedTarget) < indexOf(droppedTarget)
      ? droppedTarget.after(draggedTarget)
      : droppedTarget.before(draggedTarget);
  });

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
            <ul ref="onRef" data-dropzone>
              ${template(items, ({ value }) => `<li class="task" draggable="true">${value}</li>`)}
            </ul>
          </div>
        </section>
      `,
      { onRef: this.onRef }
    );
  }
}
