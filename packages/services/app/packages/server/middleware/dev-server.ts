import {Express} from "express";

const webpackHotMiddleware = require("webpack-hot-middleware");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("../../../webpack/webpack.config");

export const addDevMiddleware = (app: Express) => {
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
}