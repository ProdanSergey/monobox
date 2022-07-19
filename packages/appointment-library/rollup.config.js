import external from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.ts",
  output: [
    {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
      preserveModules: true,
    },
  ],
  plugins: [external(), nodeResolve(), typescript({ useTsconfigDeclarationDir: true }), postcss()],
};
