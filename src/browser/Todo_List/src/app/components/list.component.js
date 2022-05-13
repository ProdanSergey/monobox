import { DOMRenderer, withState } from "@utils/dom";
import { template } from "@utils/fn";

export const List = withState([])(({ title }, state) => {
	const [items, setItems] = state;

	const addItem = () => {
		setItems((items) => items.concat({ text: "Hello World" }));
	};

	return DOMRenderer.hydrate(
		`
      <section>
        <div>
          <span>${title}: ${items.length}</span>
          <button @click="addItem">Add Item</button>
        </div>
        <ul>
          ${template(items, ({ text }) => `<li class="list__item">${text}</li>`)}
        </ul>
      </section>
    `,
		{ addItem }
	);
});
