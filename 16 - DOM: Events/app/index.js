class Actions {
	constructor(users) {
		this.repository = new Repository([...users]);
	}

	addUser() {
		const user = new User();

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

		user.id = new Date().valueOf();

		this.repository.add(user);

		return this.repository.take();
	}

	deleteUser(id) {
		return this.repository.filter(user => user.id !== id);
	}

	take() {
		return this.repository.take();
	}

	count() {
		return this.repository.count();
	}
}

const DOM = new DOMRender(document.getElementById('root'));

const Title = ({ title }) => {
	return DOM.create('header')({
		children: [
			DOM.create('h1')({
				props: {
					className: 'title'
				},
				children: [
					title
				],
			})
		]
	});
};

const Navigation = ({ items }) => {
	const renderLink = ({ to, title }) => {
		return DOM.create('span')({
			children: [
				DOM.create('a')({
					props: {
						className: 'navigation__link',
						href: to
					},
					children: [
						title
					]
				})
			]
		});
	};

	const renderItem = (to) => {
		return DOM.create('li')({
			props: {
				className: 'navigation__item',
			},
			children: [
				renderLink(to)
			]
		});
	};

	return DOM.create('section')({
		children: [
			DOM.create('nav')({
				children: [
					DOM.create('ul')({
						props: {
							className: 'navigation'
						},
						children: items.map(renderItem)
					})
				]
			})
		]
	});
};

const LastUpdate = () => {
	return DOM.create('section')({
		children: [
			DOM.create('p')({
				children: [
					'Last update: ',
					DOM.create('time')({
						props: {
							className: 'timestamp'
						}
					})
				]
			})
		]
	});
};

const ListItem = ({ user, onDelete }) => {
	return DOM.create('li')({
		props: {
			className: 'list__item',
		},
		children: [
			`<span>${user.fullName}, <strong>${user.age}</strong> age old</span>`,
			DOM.create('button')({
				children: [
					'X'
				],
				handlers: {
					click: onDelete
				}
			})
		]
	});
};

const List = DOMRender.withState([], (users, setState, { title }) => {	
	const actions = new Actions(users);
	
	const handleAdd = () => {
		const users = actions.addUser();

		setState(users);
	};

	const handleDelete = (id) => () => {
		const users = actions.deleteUser(id);

		setState(users);
	};

	return DOM.create('section')({
		children: [
			DOM.create('div')({
				children: [
					`<span>${title}: ${actions.count()}</span>`,
					DOM.create('button')({
						children: [
							'+'
						],
						handlers: {
							click: handleAdd
						}
					}),
				]
			}),
			DOM.create('ul')({
				props: {
					className: 'list',
				},
				children: users.map((user) => ListItem({ user, onDelete: handleDelete(user.id) }))
			})
		]
	});
});

const App = () => {	
	const LINKS = [
		{ to: '/', title: 'Home' },
		{ to: '/about', title: 'About Us' }
	];

	return DOM.create('div')({
		children: [
			Title({ title: 'User Archive' }),
			Navigation({ items: LINKS }),
			LastUpdate(),
			List({ title: 'Users count'})
		]
	});
};

DOM.mount(App());