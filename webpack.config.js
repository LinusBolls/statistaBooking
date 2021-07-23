const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/client/index.js",
  output: {
    filename: "bundle.[fullhash].js",
    publicPath: "/",
  },
  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.(tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/client/index.html",
    }),
  ],
  devServer: {
    contentBase: "./dist",
    host: "localhost",
    port: 3000,
    historyApiFallback: true,
    open: true,
  },
};
