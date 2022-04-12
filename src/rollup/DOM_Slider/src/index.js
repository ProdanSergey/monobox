import { ImageComponent } from "./app/components/image";
import { SliderComponent } from "./app/components/slider";
import { Framework } from "./app/framework";
import "./styles/index.css";

const slider = new SliderComponent({
	items: [
		"https://picsum.photos/640/480?random=1",
		"https://picsum.photos/640/480?random=2",
		"https://picsum.photos/640/480?random=3",
		"https://picsum.photos/640/480?random=4",
		"https://picsum.photos/640/480?random=5",
	],
});

Framework.mount(document.getElementById("root"), slider);
