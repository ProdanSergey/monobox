import { BaseComponent } from "../component";
import { Framework } from "../framework";
import { ImageComponent } from "./image";

class SliderItemComponent extends BaseComponent {
	constructor(props) {
		super("div", props, {
			attributes: {
				className: "sc-slider__item",
			},
			children: [props.item],
		});
	}
}

class SliderTrackComponent extends BaseComponent {
	constructor(props) {
		super("div", props, {
			attributes: {
				className: "sc-slider__track",
			},
			children: props.items.map((item) => new SliderItemComponent({ item })),
		});
	}
}

class SliderControlComponent extends BaseComponent {
	constructor(props) {
		const { icon, position, onClick } = props;

		super("button", props, {
			attributes: {
				onclick: onClick,
				className: Framework.className("sc-slider__control", position),
			},
			children: [icon],
		});
	}
}

export const SliderComponent = (() => {
	const isAtFirstSlide = (track) => {
		return track.scrollLeft === 0;
	};

	const isAtLastSlide = (track, count) => {
		return track.scrollLeft >= track.clientWidth * (count - 1);
	};

	class SliderComponent extends BaseComponent {
		constructor(props) {
			const trackRef = Framework.createRef();

			super(
				"div",
				props,
				{
					attributes: {
						className: ["sc-slider"],
					},
					children: [
						new SliderControlComponent({ icon: "<", position: "left", onClick: () => this.prev() }),
						new SliderTrackComponent({
							items: props.items.map((src) => new ImageComponent({ src })),
						}).withRef(trackRef),
						new SliderControlComponent({ icon: ">", position: "right", onClick: () => this.next() }),
					],
				},
				{ track: trackRef }
			);
		}

		prev() {
			isAtFirstSlide(this.track()) ? this.last() : (this.track().scrollLeft -= this.track().clientWidth);
		}

		next() {
			isAtLastSlide(this.track(), this.props.items.length)
				? this.first()
				: (this.track().scrollLeft += this.track().clientWidth);
		}

		nth(nthPosition) {
			this.track().scrollLeft = this.track().clientWidth * (nthPosition - 1);
		}

		last() {
			this.nth(this.props.items.length);
		}

		first() {
			this.nth(1);
		}

		track() {
			return this.refs.track.current;
		}
	}

	return SliderComponent;
})();
