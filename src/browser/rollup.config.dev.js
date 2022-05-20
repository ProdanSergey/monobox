import { readdir } from "node:fs/promises";

import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

import { digest, mapDist, mapSrc, plugins, output } from "./shared/rollup";

const bootstrap = async () => {
  const PACKAGE_NAME = process.env.PACKAGE;

  try {
    const entries = await readdir(mapSrc(PACKAGE_NAME));

    return {
      input: entries.filter(digest).map((file) => mapSrc(PACKAGE_NAME, file)),
      plugins: [
        ...plugins(PACKAGE_NAME),
        serve({
          port: 8000,
          contentBase: mapDist(PACKAGE_NAME),
          historyApiFallback: true,
          open: true,
        }),
        livereload({
          delay: 500,
          exts: ["html", "js"],
          watch: mapDist(PACKAGE_NAME),
        }),
      ],
      output: output(PACKAGE_NAME),
    };
  } catch {
    throw new Error(`Package "${PACKAGE_NAME}" Not Found. `);
  }
};

export default bootstrap();
