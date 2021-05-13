const webpackHotMiddleware = require("webpack-hot-middleware");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const express = require("express");
const config = require("config");
const webpackConfig = require("../../webpack/webpack.config");


const app = express();
const compiler = webpack(webpackConfig);
const webpackDevMdlwre = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
});
const webpackHotMdlwre = webpackHotMiddleware(compiler);

app.use(
  webpackDevMdlwre
);
app.use(
  webpackHotMdlwre
);

app.get("/convert", () => "hello")
app.listen(
  config.get("APP.SERVER_URL"), function () {
  console.log('Running dev server at localhost:3000!\n');
});