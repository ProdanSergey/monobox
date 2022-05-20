import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const environment = () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const PACKAGES_PATH = resolve(__dirname, "../packages");
  const UTILS_PATH = resolve(__dirname, "../utils");
  const ASSETS_PATH = resolve(__dirname, "../assets");
  const ROOT_PATH = resolve(__dirname, "../");

  return {
    PACKAGES_PATH,
    UTILS_PATH,
    ASSETS_PATH,
    ROOT_PATH,
  };
};
