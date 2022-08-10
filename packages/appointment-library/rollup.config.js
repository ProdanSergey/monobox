import peerDepsExternal from "rollup-plugin-peer-deps-external";
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
  plugins: [peerDepsExternal(), typescript({ useTsconfigDeclarationDir: true }), postcss()],
};
