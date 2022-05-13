import { store } from "./store";

export const DocumentInput = (input, render) => {
	input.addEventListener("change", (event) => {
		event.preventDefault();

		for (const file of event.target.files) {
			store.set(file.name, file);
		}

		event.target.value = null;

		render();
	});
};
