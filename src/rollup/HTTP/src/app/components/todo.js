import { item, button } from "@utils/dom";

export const Todo = ({ id, fakeId, title, onRemove }) => {
	return item(
		{
			"data-id": fakeId ?? id,
		},
		[
			title,
			button(
				{
					"@click": onRemove,
				},
				["x"]
			),
		]
	);
};
