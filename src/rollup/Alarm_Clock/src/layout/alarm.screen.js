import { BaseComponent, div, h2, span } from "@utils/dom";
import tickIcon from "../assets/icons/tick.svg";
import { ButtonWithIcon } from "../components/button.component";
import { StatusBar } from "../components/statusbar.component";

import "./alarm.styles.css";

export class AlarmScreen extends BaseComponent {
	dismiss = () => {
		this.emit("alarm:dismiss");
		this.emit("dialog:close", "alarm-dialog");
	};

	onMount() {
		this.on("alarm:active", () => {
			this.emit("dialog:open", "alarm-dialog");
		});
	}

	render() {
		return div({ className: "screen alarm" }, [
			new StatusBar({
				children: [
					new ButtonWithIcon({
						icon: tickIcon(),
						onClick: this.dismiss,
						className: "alarm__icon",
					}),
				],
			}),
			h2({ className: "alarm__message" }, [span({}, ["Wake Up!"])]),
		]);
	}
}
