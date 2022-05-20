import { v4 as uniqid } from "uuid";

import { useListeners } from "./use-listeners";

const useStore = () => {
	const store = new Map();

	const get = async ({ dataTransfer }) => {
		for (const item of dataTransfer.items) {
			const target = await new Promise((resolve) => {
				try {
					item.getAsString((value) => {
						store.has(value) ? resolve(store.get(value)) : resolve(null);
					});
				} catch {
					resolve(null);
				}
			});

			if (target) {
				return target;
			}
		}

		return null;
	};

	const set = ({ target, dataTransfer }) => {
		const id = uniqid();
		store.set(id, target);
		dataTransfer.items.add(id, "text/plain");
	};

	const clear = ({ dataTransfer }) => {
		store.clear();
		dataTransfer.items.clear();
	};

	return {
		get,
		set,
		clear,
	};
};

export const useDragAndDrop = (onDrop) => {
	const store = useStore();
	const listeners = useListeners();

	const hoverIn = (target) => {
		target.setAttribute("data-hover", "");
	};

	const hoverOut = (target) => {
		target.removeAttribute("data-hover");
	};

	const dragIn = (target) => {
		target.setAttribute("data-dragged", "");
	};

	const dragOut = (target) => {
		target.removeAttribute("data-dragged");
	};

	const dragOver = (event) => {
		event.preventDefault();
		const { target } = event;

		if (target.hasAttribute("draggable")) {
			hoverIn(target);
		}
	};

	const dragLeave = ({ target }) => {
		if (target.hasAttribute("draggable")) {
			hoverOut(target);
		}
	};

	const dragEnd = (event) => {
		const { target } = event;

		dragOut(target);
		store.clear(event);
		listeners.clear();
	};

	const dragStart = (event) => {
		const { currentTarget, target } = event;

		dragIn(target);

		listeners.add(currentTarget, "dragover", dragOver);
		listeners.add(currentTarget, "dragleave", dragLeave);
		listeners.add(currentTarget, "dragend", dragEnd);

		store.set(event);
	};

	const drop = async (event) => {
		event.preventDefault();
		const { target } = event;

		hoverOut(target);

		onDrop({
			currentTarget: event.currentTarget,
			draggedTarget: await store.get(event),
			droppedTarget: event.target,
		});
	};

	return (element) => {
		element.addEventListener("dragstart", dragStart);
		element.addEventListener("drop", drop);
	};
};
