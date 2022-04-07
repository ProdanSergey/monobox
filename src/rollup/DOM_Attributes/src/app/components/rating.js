import { BaseComponent } from "../component";

export class RatingComponent extends BaseComponent {
	render() {
		for (const item of this.container.children) {
			item.onmouseover = () => {
				this.togglePreview(item);
			};

			item.onmouseout = () => {
				this.togglePreview(item);
			};

			item.onclick = () => {
				this.toggleSelect(item);
			};
		}
	}

	togglePreview(item) {
		item.classList.toggle(this.meta.onPreview);
		if (item.previousElementSibling) this.togglePreview(item.previousElementSibling);
	}

	toggleSelect(item) {
		const targetIndex = this.indexOf(item);

		const select = (item) => {
			if (!item) {
				return true;
			}

			this.indexOf(item) > targetIndex
				? item.classList.remove(this.meta.onSelect)
				: item.classList.add(this.meta.onSelect);

			select(item.nextElementSibling);
		};

		select(this.container.firstElementChild);
	}

	indexOf(item) {
		return Array.from(this.container.children).indexOf(item);
	}
}
