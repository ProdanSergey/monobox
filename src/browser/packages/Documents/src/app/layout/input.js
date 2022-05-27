import { BaseComponent, DOMRenderer, Icon } from "@utils/dom";
import plusIcon from "../../assets/icons/plus.svg";
import { DOCUMENT_EVENT } from "../../constants/events";

import "./input.styles.scss";

export class Input extends BaseComponent {
  change = (event) => {
    event.preventDefault();

    const { currentTarget, target } = event;

    this.emit(DOCUMENT_EVENT.ADD, {
      files: target.files,
    });

    currentTarget.reset();
  };

  render() {
    return DOMRenderer.hydrate(
      `
        <form name="files" class="input" @change="change">
          <label class="input__trigger">
            {{children}}
            <input class="input__field" id="documents" name="documents" type="file" accept="image/*" multiple />
          </label>
        </form>
      `,
      {
        change: this.change,
      },
      [new Icon({ icon: plusIcon() })]
    );
  }
}
