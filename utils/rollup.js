import cleaner from "rollup-plugin-cleaner";
import html from "rollup-plugin-html2";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";

import { extname, resolve } from "path";

const DIGESTIVE = [".js"];

export const utils = () => {
	const BASE_PATH = resolve(__dirname, "./src/rollup");
	const UTILS_PATH = resolve(__dirname, "./src/utils");

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
			entries: [{ find: "@utils", replacement: UTILS_PATH }],
		}),
		postcss({
			extract: mapDist(dir, "bundle.css"),
		}),
		html({
			template: mapSrc(dir, "index.html"),
		}),
		nodeResolve(),
	];

	return {
		digest,
		directory,
		plugins,
		mapSrc,
		mapDist,
	};
};
