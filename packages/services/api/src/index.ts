import {run} from "micro";
import routes from "./routes";
import {withErrorHandler} from "./middleware";
import {createServer} from 'http';
import {get as config} from "config";

const port = config("API.SERVER_PORT");
const requestListener = (req, res) => run(req, res, withErrorHandler(routes));
const server = createServer(requestListener);
server.listen(port, undefined, () => console.log(`Running on ${port}`));