export const RadioGroupFactory = (element, FormField) => {
	class RadioGroup extends FormField {
		get value() {
			const checked = Array.from(this.element.elements).find(({ checked }) => checked);

			if (checked) {
				return checked.value;
			}

			return "";
		}
	}

	return new RadioGroup(element);
};
