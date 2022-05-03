import { even } from "src/rollup/Symbol_Iterator_Generator/src/app/odd-even";
import "./styles/index.css";

const from = document.querySelector(".list:not([data-dropzone])");
const to = document.querySelector(".list[data-dropzone]");

const Draggable = (from, to) => {
	const store = new Map();

	from.addEventListener("dragstart", (event) => {
		const flakeId = new Date().getTime().toString();

		store.set(flakeId, event.target);

		event.dataTransfer.setData("text/plain", flakeId);
	});

	from.addEventListener("dragend", (event) => {
		event.preventDefault();

		console.log("end");

		store.clear();
	});

	to.addEventListener("dragenter", (event) => {
		event.target.classList.add("active");
	});

	to.addEventListener("dragleave", (event) => {
		event.target.classList.remove("active");
	});

	to.addEventListener("dragover", (event) => {
		event.preventDefault();
	});

	to.addEventListener("drop", (event) => {
		event.preventDefault();
		event.target.classList.remove("active");

		if (event.target.hasAttribute("data-dropzone")) {
			console.log("drop");

			const flakeId = event.dataTransfer.getData("text");

			const target = store.get(flakeId);

			target.remove();
			target.removeAttribute("draggable");
			event.target.append(target);
		}
	});
};

Draggable(from, to);
