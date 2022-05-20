import { DOMRenderer, BaseComponent, div, button, classnames } from "@utils/dom";

import "./slider.styles.scss";

import { ImageComponent } from "./image";

class SliderItemComponent extends BaseComponent {
  render() {
    const { item } = this.props;

    return div(
      {
        className: "sc-slider__item",
      },
      [new ImageComponent({ src: item })]
    );
  }
}

class SliderControlComponent extends BaseComponent {
  render() {
    const { icon, position, onClick } = this.props;

    return button(
      {
        "@click": onClick,
        className: classnames("sc-slider__control", position),
      },
      [icon]
    );
  }
}

export const SliderComponent = (() => {
  const trackRef = DOMRenderer.createRef();

  const isAtFirstSlide = () => {
    return trackRef.current.scrollLeft === 0;
  };

  const isAtLastSlide = (count) => {
    return trackRef.current.scrollLeft >= trackRef.current.clientWidth * (count - 1);
  };

  class SliderComponent extends BaseComponent {
    prev() {
      isAtFirstSlide() ? this.last() : (trackRef.current.scrollLeft -= trackRef.current.clientWidth);
    }

    next() {
      isAtLastSlide(this.props.items.length)
        ? this.first()
        : (trackRef.current.scrollLeft += trackRef.current.clientWidth);
    }

    nth(nthPosition) {
      trackRef.current.scrollLeft = trackRef.current.clientWidth * (nthPosition - 1);
    }

    last() {
      this.nth(this.props.items.length);
    }

    first() {
      this.nth(1);
    }

    render() {
      const { items } = this.props;

      return div(
        {
          className: "sc-slider",
        },
        [
          new SliderControlComponent({ icon: "<", position: "left", onClick: () => this.prev() }),
          div(
            {
              ref: trackRef,
              className: "sc-slider__track",
            },
            items.map((item) => new SliderItemComponent({ item }))
          ),
          new SliderControlComponent({ icon: ">", position: "right", onClick: () => this.next() }),
        ]
      );
    }
  }

  return SliderComponent;
})();
