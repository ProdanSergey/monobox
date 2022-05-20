import { DOMRenderer } from "@utils/dom";
import { template } from "@utils/fn";

import "./navigation.styles.css";

export const Navigation = ({ items }) => {
  return DOMRenderer.hydrate(`
    <section class="navigation">
      <nav>
        <ul class="links">
          ${template(
            items,
            ({ to, title }) => `
              <li class="link">
                <a class="link__chip" href="${to}">${title}</a>
              </li>
            `
          )}
        </ul>
      </nav>
    </section>
  `);
};
