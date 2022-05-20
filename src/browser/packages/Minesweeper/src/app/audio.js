import { BaseComponent, div } from "@utils/dom";

import "./audio.styles.css";

import { Button } from "./button";

class MuteButton extends BaseComponent {
  state = { paused: false };

  handleClick = () => {
    const { audio } = this.props;

    audio.paused ? audio.play() : audio.pause();

    this.state.paused = audio.paused;
  };

  onMount() {
    const { audio } = this.props;

    audio.addEventListener("canplaythrough", async () => {
      try {
        await audio.play();
      } catch (error) {
        this.state.paused = true;
      }
    });
  }

  render() {
    return Button({
      type: "flat",
      label: [this.state.paused ? "🔇" : "🔈"],
      className: "mute",
      onClick: this.handleClick,
    });
  }
}

export class AudioPlayer extends BaseComponent {
  audio = this.init();

  init() {
    const audio = new Audio("assets/sample.mp3");

    audio.loop = true;
    audio.volume = 1;
    audio.type = "audio/mpeg";

    return audio;
  }

  render() {
    return div(
      {
        className: "audio",
      },
      [new MuteButton({ audio: this.audio }), this.audio]
    );
  }
}
