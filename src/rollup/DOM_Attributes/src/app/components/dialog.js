import { BaseComponent } from "../component";

export class DialogComponent extends BaseComponent {
	state = { isActive: false };

	handleAnchorClick() {
		this.open();
	}

	handleReject() {
		this.meta.onReject?.();
		this.close();
	}

	handleSubmit() {
		this.meta.onSubmit?.();
		this.close();
	}

	init() {
		const anchor = document.body.querySelector(`[data-dialog=${this.meta.id}]`);
		const reject = this.container.querySelector("[data-dialog-reject]");
		const submit = this.container.querySelector("[data-dialog-submit]");

		anchor && (anchor.onclick = this.handleAnchorClick.bind(this));
		reject && (reject.onclick = this.handleReject.bind(this));
		submit && (submit.onclick = this.handleSubmit.bind(this));
	}

	render() {
		this.container.hidden = !this.state.isActive;
	}

	open() {
		this.setState(() => ({ isActive: true }));
		this.render();
	}

	close() {
		this.setState(() => ({ isActive: false }));
		this.render();
	}

	toggle() {
		this.setState((prevState) => ({ isActive: !prevState.isActive }));
		this.render();
	}

	setState(update) {
		this.state = update(this.state);
	}
}
