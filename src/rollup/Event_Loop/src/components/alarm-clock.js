import { BaseComponent, DOMRenderer } from "@utils/dom";

export class AlarmClock extends BaseComponent {
	timerId = null;

	state = { time: new Date() };

	currentTime() {
		return ["getHours", "getMinutes", "getSeconds"].map((method) => {
			return `${this.state.time[method]()}`.padStart(2, "0");
		});
	}

	currentDate() {
		return new Date().toISOString();
	}

	setTimer(timeout) {
		this.timerId = setTimeout(() => {
			this.emit("clock:alarm");
		}, timeout);
	}

	removeTimer() {
		clearTimeout(this.timerId);
	}

	onMount() {
		this.timerId = setTimeout(() => {
			this.state.time = new Date();
		}, 1000);
	}

	render() {
		const [hours, minutes, seconds] = this.currentTime();

		return DOMRenderer.hydrate(`
      <section>
        <time datetime="${this.currentDate()}">
          <span>${seconds}</span>
          <span>${minutes}</span>
          <span>${hours}</span>
        </time>
      </section>
    `);
	}
}
