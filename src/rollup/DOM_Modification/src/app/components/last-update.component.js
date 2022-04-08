import DOM from "../../dom";

export const LastUpdate = () => {
	return DOM.create("section")({
		children: [
			DOM.create("p")({
				children: [
					"Last update: ",
					DOM.create("time")({
						props: {
							className: "timestamp",
						},
					}),
				],
			}),
		],
	});
};
