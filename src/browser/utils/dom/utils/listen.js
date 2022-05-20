export const listen = (node) => (event, handler) => {
  if (!handler) {
    return;
  }

  const type = event.slice(1).toLowerCase();

  node.addEventListener(type, handler);

  return () => {
    node.removeEventListener(type, handler);
  };
};
