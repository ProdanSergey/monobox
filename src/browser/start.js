import { execSync } from "node:child_process";
import { at } from "./shared/utils.js";
import { environment } from "./shared/environment.js";

const { PACKAGES_PATH } = environment();

const start = () => {
  if (!process.env.INIT_CWD.startsWith(PACKAGES_PATH)) {
    throw new Error(`Out of "${PACKAGES_PATH}"`);
  }

  const packageName = at(process.env.INIT_CWD.split("/"), -1);

  const command = `rollup -c rollup.config.dev.js -w ${packageName ? `--environment PACKAGE:${packageName}` : ""}`;

  execSync(command, { stdio: [0, 1, 2] });
};

start();
