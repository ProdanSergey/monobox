import { BaseComponent, div } from "@utils/dom";

import "./app.styles.css";

import { Dialog } from "../components/dialog";
import { AlarmScreen } from "./screen/alarm";
import { ClockScreen } from "./screen/clock";
import { SetAlarmScreen } from "./screen/set-alarm";

export class App extends BaseComponent {
  render() {
    return div({ className: "app" }, [
      new ClockScreen(),
      new Dialog({
        id: "set-alarm-dialog",
        children: [new SetAlarmScreen()],
      }),
      new Dialog({
        id: "alarm-dialog",
        children: [new AlarmScreen()],
      }),
    ]);
  }
}
