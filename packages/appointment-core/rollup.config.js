import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

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
  plugins: [external(), typescript({ useTsconfigDeclarationDir: true })],
};
