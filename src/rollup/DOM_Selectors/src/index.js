import { STDIN } from "@utils/stdin";
import { DATE } from "@utils/date";

const APP = (() => {
	return {
		firstName() {
			const MIN = 5;
			const MAX = 20;

			const validate = (input) => {
				return input.length < MIN || input.length > MAX;
			};

			return STDIN.string(`Enter your first name: min length ${MIN}, max length ${MAX}`, validate);
		},
		lastName() {
			const MIN = 5;
			const MAX = 20;

			const validate = (input) => {
				return input.length < MIN || input.length > MAX;
			};

			return STDIN.string(`Enter your last name: min length ${MIN}, max length ${MAX}`, validate);
		},
		age() {
			const MIN_YEAR = 1900;
			const MAX_YEAR = new Date().getFullYear();

			const validateYear = (input) => input < MIN_YEAR || input > MAX_YEAR;

			const year = STDIN.number(`Enter your year of birth: min ${MIN_YEAR}, max ${MAX_YEAR}`, validateYear);

			const MIN_MONTH = 1;
			const MAX_MONTH = 12;

			const validateMonth = (input) => input < MIN_MONTH || input > MAX_MONTH;

			const month = STDIN.number(`Enter your month of month: min ${MIN_MONTH}, max ${MAX_MONTH}`, validateMonth);

			const MIN_DAY = 1;
			const MAX_DAY = DATE.getMaxDay(year, month);

			const validateDay = (input) => input < MIN_DAY || input > MAX_DAY;

			const day = STDIN.number(`Enter your month of month: min ${MIN_DAY}, max ${MAX_DAY}`, validateDay);

			const now = new Date();
			const birth = new Date(year, month - 1, day);
			const birthDay = new Date(now.getFullYear(), month - 1, day);

			const fullAge = now.getFullYear() - birth.getFullYear();

			if (now > birthDay) {
				return fullAge;
			}

			return fullAge - 1;
		},
	};
})();

// const spans = document.getElementsByTagName("span");

// for (const span of spans) {
// 	const key = span.innerText;

// 	if (key in APP && span.closest(".user-list")) {
// 		span.innerText = APP[key]();
// 	}
// }

const tagListElement = document.querySelector(".tag-list");

const tagCrawler = (element = document.body, collection = []) => {
	if (!element.children.length) {
		return [...collection, element];
	}

	return Array.from(element.children).reduce((collection, child) => [...collection, ...tagCrawler(child)], [element]);
};

const tagList = tagCrawler(document.body).reduce(
	(list, { tagName }) => ({
		...list,
		[tagName]: list[tagName] ? list[tagName] + 1 : 1,
	}),
	{}
);

tagListElement.innerHTML = Object.entries(tagList)
	.map(([key, value], _, { length }) => {
		if (key === "LI") value += length;

		return `<li>[${key.toLowerCase()}] - ${value}</li>`;
	})
	.join("");
