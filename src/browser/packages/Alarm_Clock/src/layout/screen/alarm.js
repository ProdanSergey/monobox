import { BaseComponent, div, h2, span } from "@utils/dom";
import tickIcon from "../../assets/icons/tick.svg";
import { StatusBar } from "../../components/statusbar";
import { ALARM_EVENT, DIALOG_EVENT } from "../../constants/events";
import { HomeAction } from "../action/home";

import "./alarm.styles.css";

const DIALOG_ID = "alarm-dialog";

export class AlarmScreen extends BaseComponent {
  timerId = null;

  clearTimer() {
    clearTimeout(this.timerId);
    this.timerId = null;
  }

  setTimer() {
    this.timerId = setTimeout(() => {
      this.emit(DIALOG_EVENT.CLOSE, DIALOG_ID);
    }, 5000);
  }

  onMount() {
    this.on(ALARM_EVENT.ACTIVE, () => {
      this.emit(DIALOG_EVENT.OPEN, DIALOG_ID);
      this.setTimer();
    });

    this.on(DIALOG_EVENT.CLOSE, ({ detail }) => {
      if (detail === DIALOG_ID && this.timerId) {
        this.clearTimer();
      }
    });
  }

  render() {
    return div({ className: "screen alarm" }, [
      new StatusBar({
        children: [new HomeAction({ id: DIALOG_ID, icon: tickIcon(), className: "alarm__icon" })],
      }),
      h2({ className: "alarm__message" }, [span({}, ["Wake Up!"])]),
    ]);
  }
}
