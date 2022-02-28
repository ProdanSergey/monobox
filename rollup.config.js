import { readdir } from "fs/promises";
import path from "path";

import { utils } from "./utils/rollup";

const BASE_PATH = path.resolve(__dirname, "./src/rollup");

const { digest, directory, plugins, mapDist, mapSrc } = utils(BASE_PATH);

const bootstrap = async () => {
	let packages = [];

	try {
		const files = await readdir(BASE_PATH);

		const mapProject = async (dir) => {
			try {
				const entries = await readdir(mapSrc(dir));

				return entries.filter(digest).map((file) => ({
					input: mapSrc(dir, file),
					output: {
						format: "iife",
						entryFileNames: "[hash]-bundle.js",
						dir: mapDist(dir),
					},
					plugins: plugins(dir),
				}));
			} catch (error) {
				return [];
			}
		};

		for (const dir of files.filter(directory)) packages = [...packages, ...(await mapProject(dir))];
	} catch (err) {
		console.error(err);
	}

	return packages;
};

export default bootstrap();
