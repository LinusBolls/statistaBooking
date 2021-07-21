const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const port = process.env.PORT || 3000;

module.exports = {
  mode: "development",
  entry: "./src/client/index.js",
  output: {
    filename: "bundle.[fullhash].js",
    publicPath: "http://192.168.178.78:80/",
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
    port: port,
    historyApiFallback: true,
    open: true,
  },
};
