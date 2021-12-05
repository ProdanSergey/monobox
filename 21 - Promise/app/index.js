const randomizeError = () => {
	const random = RANDOM.integer(1, 100);

	if (random > 90) {
		return new Error('Bad Request');
	}
	
	return null;
};

/* Callbacks */

const getUsers = (callback) => {
	const USERS = [
		{id: 1, name: 'Bob'},
		{id: 2, name: 'Andy'},
		{id: 3, name: 'John'},
	];
	
	setTimeout(() => {
		callback(randomizeError(), USERS);
	}, 2000);
};

const getProducts = (callback) => {
	const PRODUCTS = [
		{id: 1, categoryId: 1, name: 'iPad'},
		{id: 2, categoryId: 1, name: 'Google Pixel'},
		{id: 3, categoryId: 2, name: 'War and Peace'},
		{id: 4, categoryId: 1, name: 'iPad'},
		{id: 5, categoryId: 2, name: 'Kaizen'},
		{id: 6, categoryId: 2, name: 'Sherlock Holmes'},
	];

	setTimeout(() => {
		callback(randomizeError(), PRODUCTS);
	}, 2000);
};

const getOrders = (callback) => {
	const ORDERS = [
		{id: 1, userId: 1, checkout: [1, 6]},
		{id: 2, userId: 1, checkout: [3]},
		{id: 3, userId: 2, checkout: [2, 4]},
		{id: 4, userId: 3, checkout: [5]},
	];

	setTimeout(() => {
		callback(randomizeError(), ORDERS);
	}, 2000);
};

const getCheckoutsForUser = (userId, callback) => {
	getUsers((err, users) => {
		if (err) {
			return callback(err);
		}

		const user = users.find(({ id }) => id === userId);

		if (!user) {
			return callback(new Error('User is not found'));
		}

		getOrders((err, orders) => {
			if (err) {
				return callback(err);
			}

			const userOrders = orders.filter(order => order.userId === user.id);

			if (userOrders.length < 1) {
				return callback(new Error('User has not done any orders yet'));
			}

			getProducts((err, products) => {
				if (err) {
					return callback(err);
				}

				const userCheckouts = userOrders.map((order) => {
					return {...order, checkout: order.checkout.map(productId => products.find(product => product.id === productId))};
				}, []);

				callback(null, userCheckouts);
			});
			
		});
	});
};

getCheckoutsForUser(1, (err, checkouts) => {
	if (err) {
		console.error(err);
	} else {
		console.log(checkouts);
	}
});

/***/

/* Promise */

const getUsersPromisified = () => {
	const USERS = [
		{id: 1, name: 'Bob'},
		{id: 2, name: 'Andy'},
		{id: 3, name: 'John'},
	];
	
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const err = randomizeError();

			if (err) {
				reject(err);
			}
			resolve(USERS);
		}, 2000);
	});
};

const getProductsPromisified = () => {
	const PRODUCTS = [
		{id: 1, categoryId: 1, name: 'iPad'},
		{id: 2, categoryId: 1, name: 'Google Pixel'},
		{id: 3, categoryId: 2, name: 'War and Peace'},
		{id: 4, categoryId: 1, name: 'iPad'},
		{id: 5, categoryId: 2, name: 'Kaizen'},
		{id: 6, categoryId: 2, name: 'Sherlock Holmes'},
	];

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const err = randomizeError();

			if (err) {
				reject(err);
			}
			resolve(PRODUCTS);
		}, 2000);
	});
};

const getOrdersPromisified = () => {
	const ORDERS = [
		{id: 1, userId: 1, checkout: [1, 6]},
		{id: 2, userId: 1, checkout: [3]},
		{id: 3, userId: 2, checkout: [2, 4]},
		{id: 4, userId: 3, checkout: [5]},
	];

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const err = randomizeError();

			if (err) {
				reject(err);
			}
			resolve(ORDERS);
		}, 2000);
	});
};

const getCheckoutsForUserAsPromise = (userId) => {
	return getUsersPromisified()
		.then((users) => {
			const user = users.find(({ id }) => id === userId);

			if (!user) {
				throw new Error('User is not found');
			}

			return user;
		})
		.then((user) => {
			return getOrdersPromisified().then((orders) => {
				const userOrders = orders.filter(order => order.userId === user.id);
	
				if (userOrders.length < 1) {
					throw new Error('User has not done any orders yet');
				}
	
				return userOrders;
			});
		})
		.then((orders) => {
			return getProductsPromisified().then(products => {
				return orders.map((order) => {
					return {...order, checkout: order.checkout.map(productId => products.find(product => product.id === productId))};
				}, []);
			});
		});
};

getCheckoutsForUserAsPromise(2).then(console.log, console.error);

/***/

/* Async/Await */

const getCheckoutsForUserAsPseudoSync = async (userId) => {
	const user = (await getUsersPromisified()).find(({ id }) => id === userId);

	if (!user) {
		throw new Error('User is not found');
	}

	const orders = (await getOrdersPromisified()).filter(order => order.userId === user.id);

	if (orders.length < 1) {
		throw new Error('User has not done any orders yet');
	}

	const products = await getProductsPromisified();

	return orders.map((order) => {
		return {...order, checkout: order.checkout.map(productId => products.find(product => product.id === productId))};
	}, []);
};

getCheckoutsForUserAsPseudoSync(1).then(console.log, console.error);

/***/