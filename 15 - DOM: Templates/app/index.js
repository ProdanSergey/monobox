class Component {
	constructor({
		props = {}, 
		children = {},
	}) {
		this.props = props;
		this.compile = Handlebars.compile(this.constructor.template);

		this.children = new Proxy(children, {
			get(target, key) {
				return target[key].render();
			}
		})

		return new Proxy(this, {
			get(target, key) {
				if(key === 'render') {
					target.beforeRender();
				}

				return target[key];
			}
		});
	}

	init() {
		
	}

	beforeRender() {
		
	}

	render() {
		return this.compile(this);
	}
}

class Title extends Component {
	static template = `
		<div>
			<h1>{{props.title}}</h1>
			<button>Click On Me!!!</button>
		</div>
		<div>Foo</div>
	`;

	constructor(props) {
		super({
			props
		})
	}

	handleClick = () => {
		console.log('clicked', this)
	}
};

class App extends Component {
	static template = `
		<header>
			{{#with children}}
				{{{title}}}
			{{/with}}
		</header>
	`;

	constructor() {
		super({
			children: {
				title: new Title({ title: 'Hello World' })
			}
		})
	}
};

const app = new App();

document.getElementById('root').insertAdjacentHTML('afterbegin', app.render());

// const Navigation = ({ items }) => {
// 	const renderLink = ({ to, title }) => {
// 		return DOM.create('span')({
// 			children: [
// 				DOM.create('a')({
// 					props: {
// 						className: 'navigation__link',
// 						href: to
// 					},
// 					children: [
// 						title
// 					]
// 				})
// 			]
// 		});
// 	};

// 	const renderItem = (to) => {
// 		return DOM.create('li')({
// 			props: {
// 				className: 'navigation__item',
// 			},
// 			children: [
// 				renderLink(to)
// 			]
// 		});
// 	};

// 	return DOM.create('section')({
// 		children: [
// 			DOM.create('nav')({
// 				children: [
// 					DOM.create('ul')({
// 						props: {
// 							className: 'navigation'
// 						},
// 						children: items.map(renderItem)
// 					})
// 				]
// 			})
// 		]
// 	});
// };

// const LastUpdate = () => {
// 	return DOM.create('section')({
// 		children: [
// 			DOM.create('p')({
// 				children: [
// 					'Last update: ',
// 					DOM.create('time')({
// 						props: {
// 							className: 'timestamp'
// 						}
// 					})
// 				]
// 			})
// 		]
// 	});
// };

// const ListItem = ({ text }) => {
// 	return DOM.create('li')({
// 		props: {
// 			className: 'list__item',
// 		},
// 		children: [
// 			text
// 		]
// 	});
// };

// const List = DOMRender.withState([], (items, setState, props) => {	
// 	const addItem = () => {
// 		setState(items => items.concat({ text: 'Hello World'}));
// 	};

// 	return DOM.create('section')({
// 		children: [
// 			DOM.create('div')({
// 				children: [
// 					`<span>${props.title}: ${items.length}</span>`,
// 					DOM.create('button')({
// 						props: {
// 							className: 'add'
// 						},
// 						children: [
// 							'Add Item'
// 						],
// 						handlers: {
// 							click: addItem
// 						}
// 					}),
// 				]
// 			}),
// 			DOM.create('ul')({
// 				props: {
// 					className: 'list',
// 				},
// 				children: items.map(ListItem)
// 			})
// 		]
// 	});
// });

// class App extends Component {	
// 	constructor() {
// 		super({
// 			children: [
// 				new List({ title: 'Users count'}).
// 				new Title({ title: 'User Archive' }),
// 				new Navigation({ items: App.LINKS }),
// 				new LastUpdate(),
// 			]
// 		})
// 	}

// 	render() {
// 		return [
// 			List({ title: 'Users count'}).
// 			Title({ title: 'User Archive' }),
// 			Navigation({ items: App.LINKS }),
// 			LastUpdate(),
// 		]
// 	}

// 	static LINKS = [
// 		{ to: '/', title: 'Home' },
// 		{ to: '/about', title: 'About Us' }
// 	];
// };

// DOM.mount(App());