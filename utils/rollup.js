import cleaner from "rollup-plugin-cleaner";
import html from "rollup-plugin-html2";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import copy from "rollup-plugin-copy";
import svg from "rollup-plugin-svg";

import { extname, resolve } from "path";

const DIGESTIVE = [".js"];

export const utils = () => {
	const BASE_PATH = resolve(__dirname, "./src/rollup");
	const UTILS_PATH = resolve(__dirname, "./src/utils");
	const ICONS_PATH = resolve(__dirname, "./src/icons");

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
			entries: [
				{ find: "@utils", replacement: UTILS_PATH },
				{ find: "@icons", replacement: ICONS_PATH },
			],
		}),
		copy({
			targets: [{ src: mapSrc(dir, "assets/**/*"), dest: mapDist(dir, "assets") }],
		}),
		postcss({
			extract: mapDist(dir, "bundle.css"),
		}),
		html({
			template: mapSrc(dir, "index.html"),
		}),
		svg(),
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
