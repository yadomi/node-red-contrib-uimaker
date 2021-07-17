import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "./src/uimaker-client.ts",
    output: {
      file: "./dist/uimaker-client.js",
      format: "umd",
      name: "UIMaker",
    },
    plugins: [typescript()],
  },
];
