import { BaseComponent } from "../component";

export class RatingComponent extends BaseComponent {
  constructor(...args) {
    super(...args);

    for (const item of this.children()) {
      item.onmouseover = () => this.togglePreview(item);
      item.onmouseout = () => this.togglePreview(item);
      item.onclick = () => this.toggleSelect(item);
    }
  }

  togglePreview = (item) => {
    item.classList.toggle(this.meta.onPreview);
    item.previousElementSibling && this.togglePreview(item.previousElementSibling);
  };

  toggleSelect = (item) => {
    const targetIndex = this.indexOf(item);

    const select = (item) => {
      this.indexOf(item) > targetIndex
        ? item.classList.remove(this.meta.onSelect)
        : item.classList.add(this.meta.onSelect);

      item.previousElementSibling && select(item.previousElementSibling);
    };

    select(this.container.lastElementChild);
  };

  children() {
    return Array.from(this.container.children);
  }

  indexOf(item) {
    return this.children().indexOf(item);
  }
}
