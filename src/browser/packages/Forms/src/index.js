import "./styles/index.css";

import { Former } from "./components/form";

Former(document.forms.quiz, {
  onSubmit: console.log,
  validators: {
    fullName: (value, { email }) => {
      return value && value === email && "Must not be same as email";
    },
    email: "Must be a valid email",
  },
});
