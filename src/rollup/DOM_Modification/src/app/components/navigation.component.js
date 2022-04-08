import DOM from "../dom";

export const Navigation = ({ items }) => {
	const renderLink = ({ to, title }) => {
		return DOM.create("span")({
			children: [
				DOM.create("a")({
					props: {
						className: "navigation__link",
						href: to,
					},
					children: [title],
				}),
			],
		});
	};

	const renderItem = (to) => {
		return DOM.create("li")({
			props: {
				className: "navigation__item",
			},
			children: [renderLink(to)],
		});
	};

	return DOM.create("section")({
		children: [
			DOM.create("nav")({
				children: [
					DOM.create("ul")({
						props: {
							className: "navigation",
						},
						children: items.map(renderItem),
					}),
				],
			}),
		],
	});
};
