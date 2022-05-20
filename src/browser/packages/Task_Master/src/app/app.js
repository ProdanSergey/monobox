import { div } from "@utils/dom";

import "./app.styles.css";

import { Header } from "./components/header";
import { Tasks } from "./components/tasks";
import { Footer } from "./components/footer";

export const App = () => {
  return div({ className: "app" }, [Header({ title: "TaskMaster" }), new Tasks(), new Footer()]);
};
