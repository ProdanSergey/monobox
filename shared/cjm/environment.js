const { resolve } = require("path");

const environment = (dirname) => {
	const PACKAGES_PATH = resolve(dirname, "./src/packages");
	const UTILS_PATH = resolve(dirname, "./src/utils");
	const ASSETS_PATH = resolve(dirname, "./src/assets");

	return {
		PACKAGES_PATH,
		UTILS_PATH,
		ASSETS_PATH,
	};
};

module.exports.environment = environment;
