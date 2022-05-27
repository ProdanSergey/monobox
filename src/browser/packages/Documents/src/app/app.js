import { DOMRenderer } from "@utils/dom";

import "./app.styles.css";

import { Input } from "./layout/input";
import { Documents } from "./layout/documents";

export const App = () => {
  // return DOMRenderer.hydrate(
  //   `
  //     <main>
  //       {{children}}
  //     </main>
  //   `,
  //   {},
  //   [new Documents(), new Input()]
  // );

  return DOMRenderer.create("main", {}, [new Documents(), new Input()]);
};
