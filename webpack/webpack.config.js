const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "async-node",
  mode: "production",
  entry: ["./src/app.js"],
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "../dist"),
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
};
