import cleaner from "rollup-plugin-cleaner";
import htmlTemplate from "rollup-plugin-generate-html-template";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";

import { extname, resolve } from "path";

const DIGESTIVE = [".js"];

export const utils = (BASE_PATH) => {
	const UTILS_PATH = resolve(BASE_PATH, "./src/utils");

	const digest = (entry) => DIGESTIVE.some((ext) => extname(entry) === ext);
	const directory = (entry) => !extname(entry);

	const mapPath =
		(target) =>
		(dir, file = "") =>
			`${BASE_PATH}/${dir}/${target}` + (file && `/${file}`);

	const mapSrc = mapPath("src");
	const mapDist = mapPath("dist");

	const plugins = (dir) => [
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
	];

	return {
		digest,
		directory,
		plugins,
		mapSrc,
		mapDist,
	};
};
