import { BaseComponent, button, div, DOMRenderer } from "@utils/dom";

export class AudioPlayer extends BaseComponent {
	state = { paused: false };

	audio = this.init();

	handleClick = () => {
		console.log(this.state);
		this.audio.paused ? this.audio.play() : this.audio.pause();
	};

	init() {
		const audio = new Audio("assets/sample.mp3");

		audio.loop = true;
		audio.volume = 1;
		audio.type = "audio/mpeg";

		return audio;
	}

	onMount() {
		this.audio.addEventListener("canplaythrough", async () => {
			try {
				await this.audio.play();
			} catch (error) {
				this.setState(() => ({ paused: true }));
			}
		});
	}

	render() {
		return div(
			{
				className: "audio",
			},
			[
				button(
					{
						"@click": this.handleClick,
					},
					[this.state.paused ? "🔇" : "🔈"]
				),
				this.audio,
			]
		);
	}
}
