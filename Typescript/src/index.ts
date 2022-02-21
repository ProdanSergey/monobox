import "./styles.css";

class Logger {
	print(message: string, err?: Error) {
		if (err) {
			console.log(message, err);
		} else {
			console.log(message);
		}
	}
}

type ColourSchema = {
	color: string;
	background?: string;
};

const getColourSchema = (theme: "dark" | "light"): ColourSchema | null => {
	if (theme === "dark") {
		return { color: "black" };
	}

	if (theme === "light") {
		return { color: "white", background: "gray" };
	}

	return null;
};

const colourSchema = getColourSchema("dark");

console.log(colourSchema);

type User = {
	firstName: string;
	lastName: string;
};

const generateGreetingMessage = (user: User) => {
	if (user) {
		return `Welcome, ${user.firstName} ${user.lastName}`;
	}

	return "Welcome, guest";
};

const greetingMessage = generateGreetingMessage({
	firstName: "John",
	lastName: "Snow",
});

console.log(greetingMessage);

new Logger().print("Hello World");
