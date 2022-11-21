import { promisify } from "node:util";
import { exec } from "node:child_process";
import dayjs from "dayjs";

enum Targets {
  "toolkit" = "toolkit",
  "infra" = "infra",
  "appointment-contract" = "appointment-contract",
  "appointment-core" = "appointment-core",
  "appointment-library" = "appointment-library",
}

type Target = keyof typeof Targets;

const isTarget = (name?: string): name is Target => {
  if (!name) {
    return false;
  }

  if (Object.values(Targets).find((target) => Object.is(target, name))) {
    return true;
  }

  console.error(`Package: ${name} can not be found.`);
  process.exit(1);
};

const diff = (timestamp: number): string => {
  return dayjs(performance.now()).diff(timestamp, "seconds", true).toFixed(3);
};

const build = async (name: Target) => {
  const timestamp = performance.now();

  try {
    await promisify(exec)("yarn build", { cwd: `./packages/${name}` });
    console.log(`Package "${name}" has been built successfully in:`, diff(timestamp), "seconds");
  } catch (error) {
    console.error(`Package: ${name} can not be built.`, String(error));
    process.exit(1);
  }
};

const run = async (name?: string): Promise<void> => {
  if (isTarget(name)) {
    return await build(name);
  }

  const timestamp = performance.now();

  for (const name of Object.values(Targets)) {
    await build(name);
  }

  console.log("Total elapsed time:", diff(timestamp), "seconds");
};

run(process.argv[2]);
