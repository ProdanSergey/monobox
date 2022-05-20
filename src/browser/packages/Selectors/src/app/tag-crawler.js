const tagCrawler = (element = document.body, collection = []) => {
  if (!element.children.length) {
    return [...collection, element];
  }

  return Array.from(element.children).reduce((collection, child) => [...collection, ...tagCrawler(child)], [element]);
};

export const countTags = (container, root) => {
  const tagList = tagCrawler(container).reduce(
    (list, { tagName }) => ({
      ...list,
      [tagName]: list[tagName] ? list[tagName] + 1 : 1,
    }),
    {}
  );

  root.innerHTML = Object.entries(tagList)
    .map(([key, value], _, { length }) => {
      if (key === "LI") value += length;

      return `<li>[${key.toLowerCase()}] - ${value}</li>`;
    })
    .join("");
};
