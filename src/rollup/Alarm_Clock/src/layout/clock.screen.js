import { DATE } from "@utils/date";
import { article, BaseComponent } from "@utils/dom";
import { Face } from "../components/face.component";

export class ClockScreen extends BaseComponent {
	state = { time: this.time() };

	time() {
		const { h, m, s } = DATE.getTime();

		return { hours: h, minutes: m, seconds: s };
	}

	onMount() {
		const { ms } = DATE.getTime();

		setTimeout(() => {
			this.state.time = this.time();

			setInterval(() => {
				this.state.time = this.time();
			}, 1000);
		}, 1000 - ms);
	}

	render() {
		return article({}, [new Face({ ...this.state.time })]);
	}
}
