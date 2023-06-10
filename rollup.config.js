import vue from "rollup-plugin-vue";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default [
  {
    input: "./src/install.js",
    moduleContext: true,
    output: [
      {
        format: "esm",
        file: "dist/library.js"
      },
      {
        format: "cjs",
        file: "dist/library.cjs"
      }
    ],
    plugins: [
      vue(), peerDepsExternal()
    ]
  }
];
