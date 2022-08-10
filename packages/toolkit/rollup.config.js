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
  plugins: [typescript({ useTsconfigDeclarationDir: true })],
};
