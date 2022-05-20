import { DATE } from "@utils/date";
import { article, BaseComponent, div } from "@utils/dom";
import alertOff from "../../assets/icons/alert-off.svg";
import alertOn from "../../assets/icons/alert-on.svg";
import alertOnRepeatable from "../../assets/icons/alert-on-repeatable.svg";
import { ALARM_EVENT, DIALOG_EVENT } from "../../constants/events";
import { ButtonWithIcon } from "../../components/button";
import { Face } from "../../components/face";
import { StatusBar } from "../../components/statusbar";
import { DIALOG_ID as SET_ALARM_DIALOG_ID } from "./set-alarm";

import "./clock.styles.css";

class SetAlarmAction extends BaseComponent {
  state = { alarm: { active: false, repeatable: false } };

  click = () => {
    this.emit(DIALOG_EVENT.OPEN, SET_ALARM_DIALOG_ID);
  };

  onMount() {
    this.on(ALARM_EVENT.SET, ({ detail }) => {
      this.state.alarm = { active: true, repeatable: detail };
    });
    this.on(ALARM_EVENT.DISMISS, () => {
      this.state.alarm = { active: false, repeatable: false };
    });
  }

  render() {
    const { active, repeatable } = this.state.alarm;

    return new ButtonWithIcon({
      icon: active ? (repeatable ? alertOnRepeatable() : alertOn()) : alertOff(),
      className: "clock__icon",
      onClick: this.click,
    });
  }
}

class ClockFace extends BaseComponent {
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

export class ClockScreen extends BaseComponent {
  render() {
    return div(
      {
        className: "screen clock",
      },
      [
        new StatusBar({
          children: [new SetAlarmAction()],
        }),
        new ClockFace(),
      ]
    );
  }
}
