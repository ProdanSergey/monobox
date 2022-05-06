import { article, BaseComponent, classnames } from "@utils/dom";

const dialogContext = new Map();

export const openDialog = (id) => {
	dialogContext.get(id)?.open();
};

export const closeDialog = (id) => {
	dialogContext.get(id)?.close();
};

export const toggleDialog = (id) => {
	dialogContext.get(id)?.toggle();
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
