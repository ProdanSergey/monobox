const { controls, alarm } = document.forms;

alarm.addEventListener("submit", (e) => {
	e.preventDefault();

	const [h, m] = e.target.elements.clock.value.split(":").map(Number);

	const hours = new Date().getHours();
	const minutes = new Date().getMinutes();
	const seconds = new Date().getSeconds();

	const hTimeout = h < hours ? 24 - hours + h : h - hours;
	const mTimeout = m < minutes ? 60 - minutes + m : m - minutes;

	const timeout = hTimeout * 60 * 60 * 1000 + mTimeout * 60 * 1000 - seconds * 1000;

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
