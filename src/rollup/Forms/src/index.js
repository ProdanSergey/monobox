import { isEmail } from "@utils/regexp/email";
import { StatefulForm, StatelessForm } from "./components/form";
import "./styles/index.css";

const App = () => {
	const onSubmit = (state) => {
		console.log(state);
	};

	new StatefulForm({
		name: "basic",
		onSubmit,
		validator: {
			login: (value) => String(value).length >= 5,
			email: (value) => isEmail(value),
			subscribes: (value) => String(value).length !== 0,
			consent: (value) => Boolean(value),
		},
		messages: {
			login: "Must be longer then 5 characters",
			email: "Must be real email",
			subscribes: "You must choose at least 1 subscription type",
			consent: "Before we go, pls give us a consent",
		},
	});
};

App();
