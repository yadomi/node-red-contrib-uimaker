import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "./src/uimaker-client-react.tsx",
    output: {
      file: "./dist/uimaker-client-react.js",
      format: "esm",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
    external: ["react", "react-dom"],
    plugins: [typescript()],
  },
];
