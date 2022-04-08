import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

import { readdir } from "fs/promises";

import { utils } from "./utils/rollup";

const { digest, plugins, mapDist, mapSrc } = utils();

const bootstrap = async () => {
	const PACKAGE = process.env.PACKAGE;
	const entries = await readdir(mapSrc(PACKAGE));

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
