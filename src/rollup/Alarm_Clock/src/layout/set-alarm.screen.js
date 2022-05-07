import { BaseComponent, div } from "@utils/dom";
import { DATE } from "@utils/date";
import tickIcon from "../assets/icons/tick.svg";
import cancelIcon from "../assets/icons/cancel.svg";
import { ButtonWithIcon } from "../components/button.component";
import { EditableFace } from "../components/face.component";
import { StatusBar } from "../components/statusbar.component";

export class SetAlarmScreen extends BaseComponent {
	handleSubmit = (value) => {
		const [hours, minutes, seconds] = value.split(":").map(Number);

		const from = new Date();
		let to = new Date(from.getFullYear(), from.getMonth(), from.getDate(), hours, minutes, seconds);

		if (from > to) to.setDate(to.getDate() + 1);

		const diff = DATE.diff(from, to);

		this.props.onSubmit?.(diff);
	};

	render() {
		const { onClose } = this.props;

		return div({ className: "screen set-alarm" }, [
			new StatusBar({
				children: [
					new ButtonWithIcon({
						icon: cancelIcon(),
						onClick: onClose,
						className: "set-alarm__reject",
					}),
					new ButtonWithIcon({
						icon: tickIcon(),
						form: "set-alarm",
						type: "submit",
						className: "set-alarm__submit",
					}),
				],
			}),
			new EditableFace({ name: "set-alarm", onSubmit: this.handleSubmit }),
		]);
	}
}
