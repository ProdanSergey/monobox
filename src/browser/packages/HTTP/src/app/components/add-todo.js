import { DOMRenderer, BaseComponent } from "@utils/dom";

export class AddTodo extends BaseComponent {
  handleSubmit = (event) => {
    event.preventDefault();

    this.emit("todo:add", { value: event.target.body.value });
  };

  render() {
    return DOMRenderer.create(
      "form",
      {
        name: "add-todo",
        "@submit": this.handleSubmit,
      },
      [
        DOMRenderer.create("input", {
          type: "text",
          name: "body",
        }),
        DOMRenderer.create(
          "button",
          {
            type: "submit",
          },
          ["+"]
        ),
      ]
    );
  }
}
