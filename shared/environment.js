import { resolve } from "path";

export const environment = (dirname) => {
	const PACKAGES_PATH = resolve(dirname, "./src/packages");
	const UTILS_PATH = resolve(dirname, "./src/utils");
	const ASSETS_PATH = resolve(dirname, "./src/assets");

	return {
		PACKAGES_PATH,
		UTILS_PATH,
		ASSETS_PATH,
	};
};
