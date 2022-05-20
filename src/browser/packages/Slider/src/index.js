import { DOMRenderer } from "@utils/dom";
import { SliderComponent } from "./app/components/slider";

const slider = new SliderComponent({
  items: [
    "https://picsum.photos/640/480?random=1",
    "https://picsum.photos/640/480?random=2",
    "https://picsum.photos/640/480?random=3",
    "https://picsum.photos/640/480?random=4",
    "https://picsum.photos/640/480?random=5",
  ],
});

DOMRenderer.mount(document.getElementById("root"), slider);
