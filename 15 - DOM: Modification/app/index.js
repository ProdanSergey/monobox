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

const ListItem = ({ text }) => {
	return DOM.create('li')({
		props: {
			className: 'list__item',
		},
		children: [
			text
		]
	});
};

const List = DOMRender.withState([], (items, setState, props) => {	
	const addItem = () => {
		setState(items => items.concat({ text: 'Hello World'}));
	};

	return DOM.create('section')({
		children: [
			DOM.create('div')({
				children: [
					`<span>${props.title}: ${items.length}</span>`,
					DOM.create('button')({
						props: {
							className: 'add'
						},
						children: [
							'Add Item'
						],
						handlers: {
							click: addItem
						}
					}),
				]
			}),
			DOM.create('ul')({
				props: {
					className: 'list',
				},
				children: items.map(ListItem)
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