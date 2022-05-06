import { section } from "@utils/dom";
import { ClockStatusBar } from "./clock.statusbar";
import { ClockScreen } from "./clock.screen";

export const App = () => {
	return section(
		{
			className: "app",
		},
		[new ClockStatusBar(), new ClockScreen()]
	);
};
