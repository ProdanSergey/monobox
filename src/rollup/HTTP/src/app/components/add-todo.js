import { DOMRenderer, withState } from "@utils/dom";

export const AddTodo = withState("")((props, state) => {
	const { onClick } = props;
	const [value, setValue] = state;

	const onChange = ({ target }) => {
		setValue(target.value);
	};

	return DOMRenderer.hydrate(
		`
      <div>
        <input value="${value}" @change="onChange">
        <button @click="onClick">+</button>
      </div>
    `,
		{ onChange, onClick: onClick(value) }
	);
});
