export const CheckboxFactory = (element, FormField) => {
	class Checkbox extends FormField {
		get value() {
			return this.element.checked;
		}
	}

	return new Checkbox(element);
};
