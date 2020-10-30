import typescript from "rollup-plugin-typescript2";
import sourceMaps from "rollup-plugin-sourcemaps";

export default {
  input: "./src/main.ts",
  plugins: [
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript"),
      tsconfig: "./tsconfig.json",
    }),
    sourceMaps(),
  ],
  output: [
    {
      format: "cjs",
      file: "lib/main.cjs.js",
      sourcemap: true,
    },
    {
      format: "es",
      file: "lib/main.esm.js",
      sourcemap: true,
    },
  ],
};
