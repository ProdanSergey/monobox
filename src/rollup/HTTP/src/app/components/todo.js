import { BaseComponent, item, button } from "@utils/dom";

export class Todo extends BaseComponent {
	render() {
		const { id, fakeId, title } = this.props;

		return item(
			{
				"data-id": fakeId ?? id,
			},
			[
				title,
				button(
					{
						"@click": () => this.emit("todo:remove", fakeId ?? id),
					},
					["x"]
				),
			]
		);
	}
}
