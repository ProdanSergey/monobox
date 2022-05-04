import { store } from "./store";

class DropzoneHandler {
	constructor(dropzone, onEnter, onDrop) {
		["dragenter", "dragover", "dragleave", "drop"].forEach((eventType) => {
			dropzone.addEventListener(eventType, this.preventDefault, false);
		});

		dropzone.addEventListener("dragenter", (event) => onEnter(this, event));
		dropzone.addEventListener("drop", (event) => onDrop(this, event));

		["dragleave", "drop"].forEach((eventType) => dropzone.addEventListener(eventType, () => this.clearInvalid));

		this.dropzone = dropzone;
	}

	clearInvalid() {
		if (this.isInvalid()) {
			this.dropzone.removeAttribute("aria-invalid");
		}
	}

	setInvalid() {
		this.dropzone.setAttribute("aria-invalid", "");
	}

	isInvalid() {
		return this.dropzone.attributes["aria-invalid"];
	}

	preventDefault(event) {
		event.preventDefault();
	}
}

export const DocumentDropzone = (dropzone, render) => {
	return new DropzoneHandler(
		dropzone,
		(dropzone, event) => {
			const { dataTransfer } = event;

			if (Array.from(dataTransfer.items).some(({ type }) => !type.startsWith("image/"))) {
				dropzone.setInvalid();
			}
		},
		(dropzone, event) => {
			if (dropzone.isInvalid()) {
				return;
			}

			for (const file of event.dataTransfer.files) {
				store.set(file.name, file);
			}

			render();
		}
	);
};
