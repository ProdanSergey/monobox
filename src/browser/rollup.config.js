import { readdir } from "fs/promises";
import { utils } from "./shared/rollup";
import { environment } from "./shared/environment";

const bootstrap = async () => {
	const { digest, directory, plugins, mapDist, mapSrc } = utils();

	let packages = [];

	const { PACKAGES_PATH } = environment(__dirname);

	const files = await readdir(PACKAGES_PATH);

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

	return packages;
};

export default bootstrap();
