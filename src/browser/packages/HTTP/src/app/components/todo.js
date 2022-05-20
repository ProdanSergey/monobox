import { DOMRenderer, BaseComponent } from "@utils/dom";

export class Todo extends BaseComponent {
  render() {
    const { id, fakeId, title } = this.props;

    return DOMRenderer.hydrate(
      `
        <li data-id="${fakeId ?? id}">
          <span>${title}</span>
          <button @click="onClick">
            x
          </button>
        </li>
      `,
      { onClick: () => this.emit("todo:remove", { id: fakeId ?? id }) }
    );
  }
}
