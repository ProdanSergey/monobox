import cleaner from "rollup-plugin-cleaner";
import htmlTemplate from "rollup-plugin-generate-html-template";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";

import { readdir } from "fs/promises";
import path from "path";

import { utils } from "./utils/rollup";

const BASE_PATH = path.resolve(__dirname, "./src/rollup");
const UTILS_PATH = path.resolve(__dirname, "./src/utils");

const { digest, directory, mapDist, mapSrc } = utils(BASE_PATH);

const bootstrap = async () => {
	let packages = [];

	try {
		const files = await readdir(BASE_PATH);

		const mapProject = async (dir) => {
			try {
				// try to get project src
				const entries = await readdir(mapSrc(dir));

				return entries.filter(digest).map((file) => ({
					input: mapSrc(dir, file),
					output: {
						format: "iife",
						entryFileNames: "[hash]-bundle.js",
						dir: mapDist(dir),
					},
					plugins: [
						cleaner({
							targets: [mapDist(dir)],
						}),
						alias({
							entries: [{ find: "utils", replacement: UTILS_PATH }],
						}),
						postcss({
							extract: mapDist(dir, "bundle.css"),
						}),
						htmlTemplate({
							template: mapSrc(dir, "index.html"),
							target: mapDist(dir, "index.html"),
						}),
					],
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
