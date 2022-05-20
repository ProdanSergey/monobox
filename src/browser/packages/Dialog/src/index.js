import { DialogComponent } from "./app/components/dialog";
import { RatingComponent } from "./app/components/rating";

import "./styles/index.css";

new RatingComponent(document.body.querySelector(".app-rating"), {
  onPreview: "previewed",
  onSelect: "selected",
});

new DialogComponent(document.body.querySelector(".app-dialog"), {
  id: "example",
  onSubmit: () => {
    alert("Bingo!!!");
  },
});
