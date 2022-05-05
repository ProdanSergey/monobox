const execSync = require("child_process").execSync;

const packageName = process.argv[2];

const command = `rollup -c rollup.dev.config.js -w ${packageName ? `--environment PACKAGE:${packageName}` : ""}`;

execSync(command, { stdio: [0, 1, 2] });
