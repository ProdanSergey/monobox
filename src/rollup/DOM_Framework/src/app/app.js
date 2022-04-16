import { div, DOMRenderer } from "@utils/dom";
import { Title } from "./components/title.component";
import { Navigation } from "./components/navigation.component";
import { LastUpdate } from "./components/last-update.component";
import { List } from "./components/list.component";

export const App = () => {
	const LINKS = [
		{ to: "/", title: "Home" },
		{ to: "/about", title: "About Us" },
	];

	return DOMRenderer.fragment(
		Title({ title: "User Archive" }),
		Navigation({ items: LINKS }),
		LastUpdate(),
		List({ title: "Users count" })
	);
};
