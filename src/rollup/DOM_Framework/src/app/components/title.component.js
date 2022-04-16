import { DOMRenderer } from "@utils/dom";

export const Title = ({ title }) => {
	return DOMRenderer.hydrate(`
    <header>
      <h1 class="title">${title}</h1>
    </header>
  `);
};
