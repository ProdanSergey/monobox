import { DOMRenderer, item } from "@utils/dom";
import { template } from "@utils/fn";

export const Navigation = ({ items }) => {
	return DOMRenderer.hydrate(`
    <section>
      <nav>
        <ul class="navigation">
          ${template(
						items,
						({ to, title }) => `
              <li>
                <span>
                  <a href="${to}">${title}</a>
                </span>
              </li>
            `
					)}
        </ul>
      </nav>
    </section>
  `);
};
