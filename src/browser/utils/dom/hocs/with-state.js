import { isFunction } from "@utils/fn";

export const withState = (initial) => (component) => {
  let state = initial,
    ref,
    render;

  const reRender = () => {
    const prevRef = ref;
    ref = render([state, setState]);

    requestAnimationFrame(() => {
      prevRef.replaceWith(ref);
    });
  };

  const setState = (update) => {
    state = isFunction(update) ? update(state) : update;
    reRender();
  };

  const bind = (...args) => {
    return (render = component.bind(null, ...args));
  };

  return (...args) => (ref = bind(...args)([state, setState]));
};
