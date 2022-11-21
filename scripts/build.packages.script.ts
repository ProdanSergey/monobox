import { promisify } from "node:util";
import { readdir, readFile } from "node:fs/promises";
import { exec } from "node:child_process";
import dayjs from "dayjs";

type Target = string;

const isObject = <T extends Record<PropertyKey, unknown>>(target: unknown): target is T => {
  return typeof target === "object" && !Array.isArray(target) && target !== null;
};

const diff = (timestamp: number): string => {
  return dayjs(performance.now()).diff(timestamp, "seconds", true).toFixed(3);
};

const mapDependenciesFromPackageJson = (packageJson: Record<PropertyKey, unknown>): Target[] => {
  if (!isObject(packageJson.dependencies)) {
    return [];
  }

  return Object.keys(packageJson.dependencies)
    .filter((key) => key.startsWith("@monobox"))
    .map((key) => key.split("/")[1]);
};

const getPackages = async (): Promise<Set<Target>> => {
  const packages = new Set<Target>();

  const readTarget = async (target: Target): Promise<void> => {
    const packageJson = await readFile(`./packages/${target}/package.json`, "utf8").then(JSON.parse);

    if (!packageJson) {
      return;
    }

    for (const target of mapDependenciesFromPackageJson(packageJson)) {
      await readTarget(target);
    }

    packages.add(target);
  };

  for (const target of await readdir("./packages")) {
    await readTarget(target);
  }

  return packages;
};

(async (arg?: string) => {
  const packages = await getPackages();

  const isTarget = (name?: string): name is Target => {
    if (!name) {
      return false;
    }
    if (packages.has(name)) {
      return true;
    }

    console.error(`Package: ${name} can not be found.`);
    process.exit(1);
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

  if (isTarget(arg)) {
    return await build(arg);
  }

  const timestamp = performance.now();

  for (const name of Array.from(packages)) {
    await build(name);
  }

  console.log("Total elapsed time:", diff(timestamp), "seconds");
})(process.argv[2]);
