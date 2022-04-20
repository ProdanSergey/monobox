import { BaseComponent, DOMRenderer } from "@utils/dom";

export class AlarmControls extends BaseComponent {
	render() {
		return DOMRenderer.hydrate(`
      <div>
        <button name="set">Set Alarm</button>
        <button name="reset" hidden>Remove Alarm</button>
      </div>
    `);
	}
}
