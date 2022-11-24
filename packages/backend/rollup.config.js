import del from "rollup-plugin-delete";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: [
    {
      dir: "dist/cjs",
      format: "cjs",
      sourcemap: true,
      preserveModules: true,
    },
    {
      dir: "dist/esm",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
    },
  ],
  plugins: [del({ targets: "dist/*" }), peerDepsExternal(), typescript({ useTsconfigDeclarationDir: true })],
};
