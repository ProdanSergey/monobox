import { readdir } from "fs/promises";

import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

import { utils } from "./shared/rollup";

const bootstrap = async () => {
	const { digest, plugins, mapDist, mapSrc } = utils();

	const PACKAGE = process.env.PACKAGE;

	let entries;

	try {
		entries = await readdir(mapSrc(PACKAGE));
	} catch {
		throw new Error(`Package "${PACKAGE}" Not Found`);
	}

	return {
		input: entries.filter(digest).map((file) => mapSrc(PACKAGE, file)),
		output: {
			format: "iife",
			entryFileNames: "[hash]-bundle.js",
			dir: mapDist(PACKAGE),
		},
		plugins: [
			...plugins(PACKAGE),
			serve({
				port: 8000,
				contentBase: mapDist(PACKAGE),
				historyApiFallback: true,
				open: true,
			}),
			livereload({
				delay: 500,
				exts: ["html", "js"],
				watch: mapDist(PACKAGE),
			}),
		],
	};
};

export default bootstrap();
