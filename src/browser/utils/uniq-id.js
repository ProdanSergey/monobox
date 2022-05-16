import { RANDOM } from "./random";

export const uniqId = () => {
	const timestamp = new Date().getTime();
	let hash;

	return `${timestamp}-${(hash = timestamp / RANDOM.integer(5, 10))}-${hash % 3}`;
};
