const DOM = new DOMRender(document.querySelector("#root"));

const Input = ({ name, type, value, error }) => {
	return DOM.create("div")({
		props: {
			className: "form__input",
		},
		children: [
			DOM.create("input")({
				props: {
					name,
					type,
					value,
				},
			}),
			DOM.create("span")({
				classNames: [
					"form__error",
					{ ["form__error--visible"]: typeof error === "string" },
				],
				children: [error],
			}),
		],
	});
};

const Field = ({ children }) => {
	return DOM.create("label")({
		props: {
			className: "form__field",
		},
		children,
	});
};

const Form = DOMRender.withState(
	{
		state: {
			email: "",
			password: "",
		},
		errors: {
			email: null,
			password: null,
		},
	},
	({ state, errors }, setState) => {
		const handleChange = ({ target }) => {
			const { name, value } = target;

			setState((form) => ({
				...form,
				state: {
					...form.state,
					[name]: value,
				},
				errors: {
					...form.errors,
					[name]: Form.SCHEMA[name]?.validation?.(value)
						? Form.SCHEMA[name]?.message
						: false,
				},
			}));
		};

		const handleSubmit = (event) => {
			event.preventDefault();

			COOKIES.setCookie("user", state.email, {
				expires: new Date().setDate(new Date().getDate() + 1),
			});
		};

		return DOM.create("form")({
			props: {
				className: "from",
			},
			children: [
				...Form.FIELDS.map(({ name, type, label }) => {
					return Field({
						children: [
							label,
							Input({ name, type, value: state[name], error: errors[name] }),
						],
					});
				}),
				DOM.create("button")({
					props: {
						type: "submit",
						disabled: Object.keys(errors).some(
							(name) => errors[name] !== false
						),
					},
					children: ["Submit"],
				}),
			],
			handlers: {
				change: handleChange,
				submit: handleSubmit,
			},
		});
	}
);

Form.FIELDS = [
	{
		name: "email",
		type: "email",
		label: "Email",
	},
	{
		name: "password",
		type: "password",
		label: "Password",
	},
];

Form.SCHEMA = {
	email: {
		validation: (value) =>
			!value.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			),
		message: "must be valid email",
	},
	password: {
		validation: (value) =>
			!value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/) || value < 9 || value > 24,
		message:
			"must contain from 9 to 24 chars, at least one digit, upper and lower case letter",
	},
};

const User = ({ email }) => {
	return DOM.create("section")({
		children: [
			DOM.create("h1")({
				children: [email],
			}),
		],
	});
};

const user = COOKIES.getCookie("user");

DOM.mount(user ? User({ email: user }) : Form());
