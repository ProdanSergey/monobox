const DOM = new DOMRender(document.querySelector("#root"));

const Info = ({ text }) => {
	return DOM.create("p")({
		props: {
			className: "info",
		},
		children: [text],
	});
};

const Message = ({ type, value }) => {
	return DOM.create("p")({
		props: {
			className: `message message--${type}`,
		},
		children: [value],
	});
};

const Restart = () => {
	return DOM.create("button")({
		props: {
			className: "restart",
		},
		children: ["Restart a game"],
	});
};

const Item = ({ id, type }) => {
	return DOM.create("li")({
		attrs: {
			"data-id": id,
			"data-type": type,
		},
		props: {
			className: "field__item",
		},
	});
};

const List = ({ items }) => {
	return DOM.create("ul")({
		props: {
			className: "field",
		},
		children: items.map(Item),
	});
};

const Game = (attempts) => {
	const FIELD = new Array(25).fill(0);

	const CELL = {
		NO_BOMB: 0,
		BOMB: 1,
		DISARMED: 2,
		FAILED: 3,
	};

	let total;

	const generateGame = () => {
		const { items, count } = FIELD.reduce(
			(acc, _, id) => {
				const random = RANDOM.integer(0, 1);

				return {
					...acc,
					items: [
						...acc.items,
						{ id, type: [CELL.NO_BOMB, CELL.BOMB][random] },
					],
					count: random ? acc.count + 1 : acc.count,
				};
			},
			{ items: [], count: 0 }
		);

		total = count;

		return {
			items,
			attempts,
			disarmed: 0,
			message: null,
		};
	};

	const getState = (items, id, type) => {
		const state = items.slice();

		state[id] = { id, type };

		return state;
	};

	const Component = (state, setState) => {
		const click = {
			handleEvent(event) {
				const target = event.target;

				switch (target.tagName) {
					case "LI":
						if (Number(target.dataset.type) < CELL.DISARMED) {
							return this.handleCell(target.dataset);
						}
						break;
					case "BUTTON":
						return this.restart();
					default:
						break;
				}
			},
			handleCell({ id, type }) {
				switch (Number(type)) {
					case CELL.NO_BOMB:
						return this.disarm(id);
					case CELL.BOMB:
						return this.fail(id);
					default:
						break;
				}
			},
			disarm(id) {
				setState((state) => {
					const items = getState(state.items, id, CELL.DISARMED);

					const disarmed = state.disarmed + 1;

					return {
						...state,
						items,
						disarmed,
						message:
							disarmed < items.length - total
								? state.message
								: {
										type: "success",
										value: "You Win!!!",
								  },
					};
				});
			},
			fail(id) {
				setState((state) => {
					const items = getState(state.items, id, CELL.FAILED);

					const attempts = state.attempts - 1;

					return {
						...state,
						items,
						attempts,
						message: attempts
							? state.message
							: {
									type: "failed",
									value: "Game Over!!!",
							  },
					};
				});
			},
			restart() {
				setState(generateGame());
			},
		};

		const { items, disarmed, attempts, message } = state;

		return DOM.create("div")({
			children: [
				Info({ text: `Bombs: ${total}` }),
				Info({ text: `Disarmed: ${disarmed}` }),
				Info({ text: `Attempts: ${attempts}` }),
				...(message ? [Message(message), Restart()] : [List({ items })]),
			],
			handlers: {
				click: click,
			},
		});
	};

	return DOMRender.withState(generateGame(), Component);
};

const Minesweeper = Game(5);

DOM.mount(Minesweeper());
