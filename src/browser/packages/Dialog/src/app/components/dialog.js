import { BaseComponent } from "../component";

export class DialogComponent extends BaseComponent {
  constructor(container, meta) {
    super(container, meta);

    this.container.hidden = true;

    const anchor = document.body.querySelector(`[data-dialog=${meta.id}]`);
    const reject = container.querySelector("[data-dialog-reject]");
    const submit = container.querySelector("[data-dialog-submit]");

    anchor && (anchor.onclick = this.handleAnchorClick);
    reject && (reject.onclick = this.handleReject);
    submit && (submit.onclick = this.handleSubmit);
  }

  handleAnchorClick = () => {
    this.open();
  };

  handleReject = () => {
    this.meta.onReject?.();
    this.close();
  };

  handleSubmit = () => {
    this.meta.onSubmit?.();
    this.close();
  };

  open() {
    console.log(this);
    this.container.hidden = false;
  }

  close() {
    this.container.hidden = true;
  }

  toggle() {
    this.container.hidden = !this.container.hidden;
  }
}
