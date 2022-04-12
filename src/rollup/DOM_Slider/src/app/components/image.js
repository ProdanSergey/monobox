import { BaseComponent } from "../component";

export class ImageComponent extends BaseComponent {
	constructor(props) {
		super("img", props, {
			attributes: {
				className: ["sc-image"],
				src: props.src,
			},
		});
	}
}
