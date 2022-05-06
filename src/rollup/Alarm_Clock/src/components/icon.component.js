import { BaseComponent, classnames, div } from "@utils/dom";

export class Icon extends BaseComponent {
	render() {
		const { className, icon } = this.props;

		return div({ className: classnames("icon", className) }, [icon]);
	}
}
