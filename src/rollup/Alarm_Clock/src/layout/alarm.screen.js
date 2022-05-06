import { BaseComponent, button, div } from "@utils/dom";
import { Face } from "../components/face.component";

export class AlarmScreen extends BaseComponent {
	render() {
		const { onSubmit } = this.props;

		return div({ className: "alarm" }, [
			new Face({ hours: 0, minutes: 0, seconds: 0, onSubmit: this.close }),
			button({ "@click": onSubmit }, ["Set Alarm"]),
		]);
	}
}
