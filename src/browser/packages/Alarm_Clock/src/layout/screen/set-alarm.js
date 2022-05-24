import { BaseComponent, classnames, div, input, label } from "@utils/dom";
import { DATE } from "@utils/date";
import tickIcon from "../../assets/icons/tick.svg";
import cancelIcon from "../../assets/icons/cancel.svg";
import repeatIcon from "../../assets/icons/repeat.svg";
import resetTime from "../../assets/icons/reset-time.svg";
import { ALARM_EVENT, DIALOG_EVENT } from "../../constants/events";
import { ButtonWithIcon } from "../../components/button";
import { EditableFace } from "../../components/face";
import { StatusBar } from "../../components/statusbar";
import { Icon } from "../../components/icon";
import { HomeAction } from "../action/home";

import "./set-alarm.styles.scss";

export const DIALOG_ID = "set-alarm-dialog";
const FORM_ID = "set-alarm";
const REPEAT_FIELD_ID = "alarm-repeat";
const REPEAT_FIELD_NAME = "repeatable";

class RepeatAction extends BaseComponent {
  state = { active: false };

  onMount() {
    this.on("change", ({ target }) => {
      if (target.name === REPEAT_FIELD_NAME) {
        this.state.active = target.checked;
      }
    });
    this.on("reset", ({ target }) => {
      if (target.name === FORM_ID) {
        this.state.active = false;
      }
    });
  }

  render() {
    const { active } = this.state;

    return label(
      {
        for: REPEAT_FIELD_ID,
        className: "set-alarm__repeat-action",
      },
      [
        new Icon({
          icon: repeatIcon(),
          className: classnames({ "set-alarm__action--negative": !active, "set-alarm__action--positive": active }),
        }),
      ]
    );
  }
}

class ResetAction extends BaseComponent {
  render() {
    return new ButtonWithIcon({
      icon: resetTime(),
      form: FORM_ID,
      type: "reset",
      className: "set-alarm__action--neutral",
    });
  }
}

class DismissAction extends BaseComponent {
  state = { disabled: true };

  onMount() {
    this.on(ALARM_EVENT.SET, () => {
      this.state.disabled = false;
    });
    this.on(ALARM_EVENT.DISMISS, () => {
      this.state.disabled = true;
    });
  }

  render() {
    const { disabled } = this.state;
    const { onClick } = this.props;

    return new ButtonWithIcon({
      icon: cancelIcon(),
      className: "set-alarm__action--negative",
      disabled,
      onClick,
    });
  }
}

export class SetAlarmScreen extends BaseComponent {
  timerId = null;

  clearAlarm() {
    clearTimeout(this.timerId);
    this.timerId = null;
  }

  setRepeatableAlarm(now) {
    this.setAlarm(DATE.diff(now, new Date(now).setHours(now.getHours() + 24)), true);
  }

  setAlarm = ({ ms }, repeatable) => {
    if (this.timerId) {
      this.clearAlarm();
    }

    this.timerId = setTimeout(() => {
      this.emit(ALARM_EVENT.ACTIVE);

      if (repeatable) {
        this.setRepeatableAlarm(new Date());
        return;
      }

      this.emit(ALARM_EVENT.DISMISS);
    }, ms);

    this.emit(ALARM_EVENT.SET, repeatable);
  };

  close = () => {
    this.emit(DIALOG_EVENT.CLOSE, DIALOG_ID);
  };

  dismiss = () => {
    if (this.timerId) {
      this.clearAlarm();
      this.emit(ALARM_EVENT.DISMISS);
    }

    this.close();
  };

  submit = (values) => {
    const { hours, minutes, seconds, repeatable } = values;

    const from = new Date();
    let to = new Date(from.getFullYear(), from.getMonth(), from.getDate(), hours, minutes, seconds);

    if (from > to) to.setDate(to.getDate() + 1);

    const alarm = DATE.diff(from, to);

    this.setAlarm(alarm, repeatable);
    this.close();
  };

  render() {
    return div({ className: "screen set-alarm" }, [
      div({ className: "set-alarm__statusbar" }, [
        new StatusBar({
          children: [new ResetAction(), new RepeatAction()],
        }),
        new StatusBar({
          children: [
            new DismissAction({ onClick: this.dismiss }),
            new ButtonWithIcon({
              icon: tickIcon(),
              form: FORM_ID,
              type: "submit",
              className: "set-alarm__action--positive",
            }),
            new HomeAction({ id: DIALOG_ID }),
          ],
        }),
      ]),
      new EditableFace({
        id: FORM_ID,
        onSubmit: this.submit,
        children: [
          input({
            id: REPEAT_FIELD_ID,
            type: "checkbox",
            name: REPEAT_FIELD_NAME,
            className: "set-alarm__repeat-input",
          }),
        ],
      }),
    ]);
  }
}
