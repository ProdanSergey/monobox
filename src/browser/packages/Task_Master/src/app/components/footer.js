import { BaseComponent, DOMRenderer } from "@utils/dom";

import "./footer.styles.scss";

export class Footer extends BaseComponent {
  input = DOMRenderer.createRef("input");

  submit = (event) => {
    event.preventDefault();

    const form = event.target;

    this.emit("task:add", { value: form.task.value });

    form.reset();
  };

  onMount() {
    this.input.current.focus();
  }

  render() {
    return DOMRenderer.hydrate(
      `
        <footer class="footer">
          <div class="container">
            <form class="form" @submit="submit">
              <input ref="ref" name="task" type="text" class="input" placeholder="Enter text..." />
            </form>
          </div>
        </footer>
      `,
      { ref: this.input, submit: this.submit }
    );
  }
}
