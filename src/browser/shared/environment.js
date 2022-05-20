import { resolve } from "path";

export const environment = (dirname) => {
	const PACKAGES_PATH = resolve(dirname, "./packages");
	const UTILS_PATH = resolve(dirname, "./utils");
	const ASSETS_PATH = resolve(dirname, "./assets");

	return {
		PACKAGES_PATH,
		UTILS_PATH,
		ASSETS_PATH,
	};
};
