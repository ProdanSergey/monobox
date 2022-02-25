const DOM = new DOMRender(document.getElementById("time"));

class Clock {
	constructor(root) {
		this.root = root;
		this.timerId = null;
	}

	start() {
		this.render();

		setInterval(() => {
			this.render();
		}, 1000);
	}

	currentTime() {
		const now = new Date();

		return ["getHours", "getMinutes", "getSeconds"].map((method) => {
			return `${now[method]()}`.padStart(2, "0");
		});
	}

	currentDate() {
		return new Date().toISOString();
	}

	setTimer(timeout) {
		this.timerId = setTimeout(() => {
			document.dispatchEvent(new CustomEvent("clock:alarm"));
		}, timeout);
	}

	removeTimer() {
		clearTimeout(this.timerId);
	}

	render() {
		const datetime = this.currentDate();
		const [hours, minutes, seconds] = this.currentTime();

		const clock = DOM.create("time")({
			attrs: {
				datetime,
			},
			children: [
				`<span>${seconds}</span>`,
				`<span>${minutes}</span>`,
				`<span>${hours}</span>`,
			],
		});

		DOM.mount(clock);
	}
}

const clock = new Clock();

clock.start();

const { controls, alarm } = document.forms;

alarm.addEventListener("submit", (e) => {
	e.preventDefault();

	const [h, m] = e.target.elements.clock.value.split(":").map(Number);

	const hours = new Date().getHours();
	const minutes = new Date().getMinutes();
	const seconds = new Date().getSeconds();

	const hTimeout = h < hours ? 24 - hours + h : h - hours;
	const mTimeout = m < minutes ? 60 - minutes + m : m - minutes;

	const timeout =
		hTimeout * 60 * 60 * 1000 + mTimeout * 60 * 1000 - seconds * 1000;

	clock.setTimer(timeout < 0 ? timeout + 24 * 60 * 60 * 1000 : timeout);

	const { set, reset } = controls.elements;

	alarm.hidden = true;
	controls.hidden = false;
	set.hidden = true;
	reset.hidden = false;
});

controls.addEventListener("submit", (e) => {
	e.preventDefault();

	controls.hidden = true;
	alarm.hidden = false;
});

controls.addEventListener("reset", (e) => {
	e.preventDefault();

	const { set, reset } = controls.elements;

	set.hidden = false;
	reset.hidden = true;

	clock.removeTimer();
});

document.addEventListener("clock:alarm", () => {
	const { set, reset } = controls.elements;

	set.hidden = false;
	reset.hidden = true;

	alert("Alarm !!!");
});
