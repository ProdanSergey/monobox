const { execSync } = require("child_process");
const { at } = require("./shared/cjm/array-at");
const { environment } = require("./shared/cjm/environment");

const start = () => {
	const { PACKAGES_PATH } = environment(__dirname);

	if (!process.env.INIT_CWD.startsWith(PACKAGES_PATH)) {
		throw new Error(`Out of "${PACKAGES_PATH}"`);
	}

	const packageName = at(process.env.INIT_CWD.split("/"), -1);

	const command = `rollup -c rollup.dev.config.js -w ${packageName ? `--environment PACKAGE:${packageName}` : ""}`;

	execSync(command, { stdio: [0, 1, 2] });
};

start();
