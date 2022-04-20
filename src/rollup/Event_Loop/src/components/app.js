import { DOMRenderer } from "@utils/dom";
import { AlarmClock } from "./alarm-clock";

export const App = () => {
	return DOMRenderer.hydrate(`
    <main>
      ${DOMRenderer.interpolate(new AlarmClock())}
      ${DOMRenderer.interpolate()}
    </main>
  `);
};
