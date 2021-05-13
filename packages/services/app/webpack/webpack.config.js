const paths = require("./paths");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ConfigWebpackPlugin = require("config-webpack");

const isDevelopment = process.env.NODE_ENV !== 'production';
const buildFolder = paths.rootDir("dist");

module.exports = {
  entry: paths.clientDir("src/index.tsx"),
  output: {
    path: buildFolder,
    filename: "[name].bundle.js"
  },
  mode: process.env.NODE_ENV || 'development',
  devtool: "cheap-module-eval-source-map",
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  devServer: {
    contentBase: buildFolder,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: paths.clientDir("public/index.html"),
      filename: "index.html",
    }),
    new HtmlWebpackHarddiskPlugin(),
    new ConfigWebpackPlugin()

  ].filter(Boolean),
};
