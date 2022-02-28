import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

import { readdir } from "fs/promises";
import path from "path";

import { utils } from "./utils/rollup";

const BASE_PATH = path.resolve(__dirname, "./src/rollup");

const { digest, plugins, mapDist, mapSrc } = utils(BASE_PATH);

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
				contentBase: mapDist(PACKAGE),
			}),
			livereload(),
		],
	};
};

export default bootstrap();
