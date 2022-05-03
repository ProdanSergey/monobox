import "./styles/index.css";

const createDocument = (file) => {
	const item = document.createElement("li");

	return item;
};

const FileDropzone = (dropzone, fileInput) => {
	dropzone.addEventListener("click", () => {
		fileInput.click();
	});

	dropzone.addEventListener("dragover", (event) => {
		event.preventDefault();
	});

	dropzone.addEventListener("dragenter", (event) => {
		console.log("dragenter", event);
	});

	dropzone.addEventListener("drop", (event) => {
		event.preventDefault();

		for (const dataItem of event.dataTransfer.items) {
			const file = dataItem.getAsFile();
		}
	});
};

FileDropzone(document.querySelector(".dropzone"), document.querySelector("#dropzone"));
