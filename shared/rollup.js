import { extname } from "path";

import cleaner from "rollup-plugin-cleaner";
import html from "rollup-plugin-html2";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import copy from "rollup-plugin-copy";
import svg from "rollup-plugin-svg-import";

import { environment } from "./environment";

export const utils = () => {
	const { PACKAGES_PATH, UTILS_PATH, ASSETS_PATH } = environment(__dirname);
	const DIGESTIVE = [".js"];

	const digest = (entry) => DIGESTIVE.some((ext) => extname(entry) === ext);
	const directory = (entry) => !extname(entry);

	const mapPath =
		(target) =>
		(dir, file = "") =>
			`${PACKAGES_PATH}/${dir}/${target}` + (file && `/${file}`);

	const mapSrc = mapPath("src");
	const mapDist = mapPath("dist");

	const plugins = (dir) => [
		cleaner({
			targets: [mapDist(dir)],
		}),
		alias({
			entries: [
				{ find: "@utils", replacement: UTILS_PATH },
				{ find: "@assets", replacement: ASSETS_PATH },
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
