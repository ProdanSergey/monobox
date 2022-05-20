import { readdir } from "fs/promises";
import { digest, directory, mapSrc, plugins, output } from "./shared/rollup";
import { environment } from "./shared/environment";

const { PACKAGES_PATH } = environment();

const mapPackage = async (packageName) => {
  try {
    const entries = await readdir(mapSrc(packageName));

    const toRollupEntry = (entryFile) => ({
      input: mapSrc(packageName, entryFile),
      output: output(packageName),
      plugins: plugins(packageName),
    });

    return entries.filter(digest).map(toRollupEntry);
  } catch {
    return [];
  }
};

const bootstrap = async () => {
  const packages = await readdir(PACKAGES_PATH);
  const entries = await Promise.all(packages.filter(directory).map(mapPackage));

  return entries.flat();
};

export default bootstrap();
