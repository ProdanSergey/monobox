import { div } from "@utils/dom";

import "./app.styles.css";

import { AudioPlayer } from "./audio";
import { Game } from "./game";

export const App = () => {
  return div({}, [new AudioPlayer(), Game(5)]);
};
