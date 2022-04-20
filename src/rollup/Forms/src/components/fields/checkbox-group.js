export const CheckboxGroupFactory = (element, FormField) => {
	class CheckboxGroup extends FormField {
		get value() {
			return Array.from(this.element.elements)
				.reduce((values, { value, checked }) => {
					if (!checked) {
						return values;
					}

					return [...values, value];
				}, [])
				.join(", ");
		}
	}

	return new CheckboxGroup(element);
};
