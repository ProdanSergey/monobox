import { extname } from "path";

const DIGESTABLE = [".js"];

export const utils = (BASE_PATH) => {
	const digest = (entry) => DIGESTABLE.some((ext) => extname(entry) === ext);
	const directory = (entry) => !extname(entry);

	const mapPath =
		(target) =>
		(dir, file = "") =>
			`${BASE_PATH}/${dir}/${target}` + (file && `/${file}`);

	return {
		digest,
		directory,
		mapSrc: mapPath("src"),
		mapDist: mapPath("dist"),
	};
};
