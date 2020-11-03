import typescript from "rollup-plugin-typescript2";
import sourceMaps from "rollup-plugin-sourcemaps";

export default {
  input: "./src/index.ts",
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
      file: "lib/index.cjs.js",
      sourcemap: true,
    },
    {
      format: "es",
      file: "lib/index.esm.js",
      sourcemap: true,
    },
    {
      name: 'cookerjs',
      format: "umd",
      file: "lib/index.umd.js",
      sourcemap: true,
    },
  ],
};
