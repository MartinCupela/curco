import {addDevMiddleware} from "./middleware/dev-server";
import {get as config} from "config";
import express from "express";

const port = config("APP.SERVER_PORT")
const app = express();

if (process.env.NODE_ENV === "development") {
  addDevMiddleware(app);
} else {
  app.use(express.static("dist"))
}

app.listen(
  port, function () {
  console.log(`Running server on: ${port}`);
});
