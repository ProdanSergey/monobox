import { article, BaseComponent, classnames } from "@utils/dom";

import "./dialog.styles.css";

const dialogContext = new Map();

export const openDialog = (id) => {
	dialogContext.get(id)?.classList.add("dialog--hidden");
};

export const closeDialog = (id) => {
	dialogContext.get(id)?.classList.remove("dialog--hidden");
};

export const toggleDialog = (id) => {
	dialogContext.get(id)?.classList.toggle("dialog--hidden");
};

export class Dialog extends BaseComponent {
	constructor(props) {
		super(props);

		dialogContext.set(props.id, this);
	}

	render() {
		const { hidden, className, children } = this.props;

		return article({ className: classnames("dialog", { ["dialog--hidden"]: hidden }, className) }, [children]);
	}
}
