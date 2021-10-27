const APPLICATION = {
	archive: archiveFactory(),
	commands: [],

	/* Private methods */ 

	init() {
		this.commands = [
			['Add a user', this.addUser],
			['Delete a user', this.deleteUser],
			['Show users', this.showUser],
			['Find a user', this.findOneUser],
			['Search users', this.findUsers],
			['Show average age', this.showAverageAge],
		];

		return this.commands.length > 0;
	},

	interact() {
		const list = this.commands.map(([name], index) => `${index} - ${name}`);

		const WELCOME_MESSAGE = (`Hello dear gest! You can choose one of the available operations from the list:\n\n${list.join('\n')}`);

		const validateIndex = (value) => !this.canExecute(value);

		return STDIN.number(WELCOME_MESSAGE, validateIndex, false);
	},

	execute(index) {
		const [, command] = this.commands[index];

		if (command) {
			command.call(this);
		}
	},

	canExecute(index) {
		return index >= 0 && index < this.commands.length;
	},

	/* Public Methods */

	run() {
		const ready = this.init();

		if (!ready) {
			throw new Error('No available command');
		}

		do {
			console.clear();

			const index = this.interact();

			if (index === null) {
				break;
			}

			this.execute(index);
		} while (confirm('Do you want to run next command?'));

		this.exit();
	},

	exit() {
		console.log('Byu, Byu!!');
	},

	addUser() {
		const user = userFactory();

		const MIN_NAME_LENGTH = 5;
		const MAX_NAME_LENGTH = 20;

		const nameValidator = function (value) {
			return value < MIN_NAME_LENGTH || value > MAX_NAME_LENGTH;
		};

		user.firstName = STDIN.string(`Enter user's name pls, min length: ${MIN_NAME_LENGTH}, max length: ${MAX_NAME_LENGTH}`, nameValidator);

		const MIN_SURNAME_LENGTH = 5;
		const MAX_SURNAME_LENGTH = 20;

		const surnameValidator = function (value) {
			return value < MIN_SURNAME_LENGTH || value > MIN_SURNAME_LENGTH;
		};

		user.lastName = STDIN.string(`Enter user's surname pls, min length: ${MIN_SURNAME_LENGTH}, max length: ${MAX_SURNAME_LENGTH}`, surnameValidator);

		const MIN_YEAR = 1900;
		const MAX_YEAR = new Date().getFullYear();

		const yearValidator = function (value) {
			return value < MIN_YEAR || value > MAX_YEAR;
		};

		user.year = STDIN.number(`Enter user's birth year pls, min: ${MIN_YEAR}, max: ${MAX_YEAR}`, yearValidator);

		const MIN_MONTH = 1;
		const MAX_MONTH = 12;

		const monthValidator = function (value) {
			return value < MIN_MONTH || value > MAX_MONTH;
		};

		user.month = STDIN.number(`Enter user's birth month pls, min: ${MIN_MONTH}, max: ${MAX_MONTH}`, monthValidator);

		const MIN_DAY = 1;
		const MAX_DAY = DATE.getMaxDay(user.year, user.month);

		const dayValidator = function (value) {
			return value < MIN_DAY || value > MAX_DAY;
		};

		user.day = STDIN.number(`Enter user's birth day pls, min: ${MIN_DAY}, max: ${MAX_DAY}`, dayValidator);

		this.archive.add(user);
	},

	deleteUser() {
		if (this.archive.isEmpty()) {
			return console.log('Forbidden operation. There are no users yet in archive');
		}

		const MIN_INDEX = 0;
		const MAX_INDEX = this.archive.count() - 1;

		const range = this.archive.take().map((user, index) => `[${index}]: ${user.fullName}`);

		const indexValidator = function (value) {
			return value < MIN_INDEX || value > MAX_INDEX;
		};

		const message = (`Enter index, choose one from a list:\n\n${range.join('\n')}`);

		const indexToBeDeleted = STDIN.number(message, indexValidator);

		const deletedUser = this.archive.delete(indexToBeDeleted);

		console.log(`User ${deletedUser.fullName} has been deleted`);
		console.log(`There are ${this.archive.count()} users in archive`);
	},

	showUser() {
		if (this.archive.isEmpty()) {
			return console.log('There are no users yet in archive');
		}

		const show = (user, index) => {
			const yearType = DATE.isLeapYear(user.year) ? ' (is leap year)' : '';
			const [zodiacName, zodiacSign] = DATE.getZodiac(user.month, user.day);

			console.log(`[${index + 1}]: ${user.fullName}, ${user.age} age old${yearType} ${zodiacName} ${zodiacSign}`);
		};

		console.log(`There are ${this.archive.count()} users in archive`);
		this.archive.each(show);
	},

	findOneUser() {
		if (this.archive.isEmpty()) {
			return console.log('There are no users yet in archive');
		}

		const message = "Enter user's name or surname";

		const query = STDIN.string(message);

		const predicate = (user) => user.firstName === query || user.lastName === query;

		const user = this.archive.find(predicate);

		if (user) {
			console.log(`User ${user.fullName} have been found`);
		} else {
			console.log('Not found...');
		}
	},

	findUsers() {
		if (this.archive.isEmpty()) {
			return console.log('There are no users yet in archive');
		}

		const message = 'Enter a search query';

		const query = STDIN.string(message);

		const predicate = (user) => [user.firstName, user.lastName].some((value) => value.includes(query));

		const normalizeUser = (user, index) => `${index + 1}: ${user.fullName} - ${user.day}/${user.month}/${user.year}`;

		const users = this.archive.filter(predicate).map(normalizeUser);

		if (users.length) {
			console.log(`Users have been found:\n\n${users.join('\n')}`);
		} else {
			console.log('Not found...');
		}
	},

	showAverageAge() {
		if (this.archive.isEmpty()) {
			return console.log('There are no users yet in archive');
		}

		let age = 0;
		let count = 0;

		this.archive.each((user) => {
			age += user.age;
			count++;
		});

		console.log(`There are ${this.archive.count()} users in archive`);
		console.log(`Average age is: ${age / count}`);
	},
};

APPLICATION.run();
