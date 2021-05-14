import express from "express";
import {addDevMiddleware} from "./middleware/dev-server";
import {get as config} from "config";

const port = config("APP.SERVER_PORT")
export const app = express();

if (process.env.NODE_ENV === "development") {
  addDevMiddleware(app);
}

app.listen(
  port, function () {
  console.log(`Running server on: ${port}`);
});
