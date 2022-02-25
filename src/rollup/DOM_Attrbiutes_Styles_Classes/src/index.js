import { Timestamp } from "./app/timestamp";
import { USER_DATA } from "./app/data";

import "./styles/index.css";

class App {
	constructor() {
		this.list = document.querySelector(".list");
		this.timestamp = document.querySelector(".timestamp");
	}

	render() {
		for (const item of this.list.children) {
			const fields = Array.from(item.children).filter((child) => child.hasAttribute("data-field"));

			for (const field of fields) {
				const key = field.dataset.field;

				if (USER_DATA.has(key)) {
					field.innerText = USER_DATA.get(key);
				}
			}

			item.classList.add("list__item--ready");
		}

		this.update();
	}

	update() {
		const timestamp = new Timestamp();

		this.timestamp.setAttribute("datetime", timestamp.toISOString());
		this.timestamp.innerText = timestamp;
	}
}

new App().render();
