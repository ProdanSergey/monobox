import { DOMRenderer } from "@utils/dom";

import "./header.styles.css";
import { Navigation } from "./navigation";

export const Header = ({ title }) => {
  const LINKS = [
    { to: "/", title: "All" },
    { to: "/work", title: "Work" },
  ];

  return DOMRenderer.hydrate(
    `
      <header class="header">
        <div class="container">
          <h1 class="title">${title}</h1>
          <nav>
            {{children}}
          </nav>
        </div>
      </header>
    `,
    {},
    [Navigation({ items: LINKS })]
  );
};
