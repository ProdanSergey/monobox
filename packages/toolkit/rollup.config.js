import del from "rollup-plugin-delete";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: [
    {
      dir: "dist/cjs/index.js",
      format: "cjs",
      sourcemap: true,
      preserveModules: true,
    },
    {
      dir: "dist/esm/index.js",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
    },
  ],
  plugins: [del({ targets: "dist/*" }), typescript({ useTsconfigDeclarationDir: true })],
};
