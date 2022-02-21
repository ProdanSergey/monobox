const userFactory = function userFactory() {
	return {
		firstName: null,
		lastName: null,
		year: null,
		month: null,
		day: null,

		get fullName() {
			return `${this.firstName} ${this.lastName}`;
		},

		// get age() {
		// 	const month = this.month - 1;

		// 	const now = new Date();
		// 	const birth = new Date(this.year, month, this.day);
		// 	const birthDay = new Date(now.getFullYear(), month, this.day);

		// 	const fullAge = now.getFullYear() - birth.getFullYear();

		// 	if (now > birthDay) {
		// 		return fullAge;
		// 	}

		// 	return fullAge - 1;
		// },

		get age() {
			const now = new Date();

			const y = now.getFullYear();
			const m = now.getMonth() + 1;
			const d = now.getDate();

			let age = y - this.year;

			if (m >= this.month && d >= this.day) {
				return age;
			}

			return age - 1;
		},
	};
};

const archiveFactory = function archiveFactory() {
	const entries = [];

	return {
		add(entry) {
			return entries.push(entry);
		},
		delete(index) {
			const [deleted] = entries.splice(index, 1);

			return deleted;
		},
		find(predicate) {
			return entries.find(predicate);
		},
		filter(predicate) {
			return entries.filter(predicate);
		},
		each(callback) {
			entries.forEach(callback);
		},
		isEmpty() {
			return entries.length === 0;
		},
		count() {
			return entries.length;
		},
		take(start, end) {
			return entries.slice(start, end);
		},
	};
};
