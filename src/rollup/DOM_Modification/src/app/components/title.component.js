import DOM from "../dom";

export const Title = ({ title }) => {
	return DOM.create("header")({
		children: [
			DOM.create("h1")({
				props: {
					className: "title",
				},
				children: [title],
			}),
		],
	});
};
