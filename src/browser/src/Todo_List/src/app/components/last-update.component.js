import { DOMRenderer } from "@utils/dom";

export const LastUpdate = () => {
	return DOMRenderer.hydrate(`
    <section>
      <p>
        <time>${new Date().toISOString()}</time>
      </p>
    </section>
  `);
};
