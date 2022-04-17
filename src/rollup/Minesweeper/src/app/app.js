import { DOMRenderer } from "@utils/dom";
import { AudioPlayer } from "./audio";
import { Game } from "./game";

export const App = () => {
	return DOMRenderer.fragment(new AudioPlayer(), Game(5));
};
