import { extname, resolve } from "node:path";

import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import cleaner from "rollup-plugin-cleaner";
import html from "rollup-plugin-html2";
import postcss from "rollup-plugin-postcss";
import nodePolyfills from "rollup-plugin-node-polyfills";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import copy from "rollup-plugin-copy";
import svg from "rollup-plugin-svg-import";

import { environment } from "./environment.js";

const { PACKAGES_PATH, UTILS_PATH, ASSETS_PATH, ROOT_PATH } = environment();

const DIGESTIVE = [".js"];

export const digest = (entry) => DIGESTIVE.some((ext) => extname(entry) === ext);
export const directory = (entry) => !extname(entry);

export const mapPath = (packageName) => {
  return (dir, file = "") => `${PACKAGES_PATH}/${dir}/${packageName}` + (file && `/${file}`);
};

export const mapSrc = mapPath("src");
export const mapDist = mapPath("dist");

export const plugins = (packageName) => [
  cleaner({
    targets: [mapDist(packageName)],
  }),
  nodePolyfills(),
  nodeResolve({
    browser: true,
    preferBuiltins: false,
  }),
  commonjs({
    include: "node_modules/**",
  }),
  babel({
    exclude: "node_modules/**",
    presets: [["@babel/preset-env", { useBuiltIns: "entry", corejs: 3 }]],
    babelHelpers: "bundled",
  }),
  alias({
    entries: [
      { find: "@utils", replacement: UTILS_PATH },
      { find: "@assets", replacement: ASSETS_PATH },
    ],
  }),
  copy({
    targets: [
      {
        src: mapSrc(packageName, "./assets"),
        dest: mapDist(packageName),
      },
      {
        src: resolve(ROOT_PATH, "./assets/normalize.css"),
        dest: mapDist(packageName, "./assets/styles"),
      },
    ],
  }),
  postcss({
    extract: mapDist(packageName, "bundle.css"),
  }),
  html({
    template: mapSrc(packageName, "index.html"),
    entries: {
      index: {
        type: "module",
      },
    },
    externals: {
      before: [
        {
          tag: "link",
          href: "./assets/styles/normalize.css",
        },
      ],
    },
  }),
  svg(),
];

export const output = (packageName) => ({
  format: "esm",
  entryFileNames: "[hash]-bundle.js",
  dir: mapDist(packageName),
  manualChunks(id) {
    if (id.includes("node_modules")) {
      return "vendor";
    }
  },
});
