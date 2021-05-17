import {ApolloServer} from "apollo-server-micro";
import schema from "./schema";
import {FixerApi} from "@converter/libs.fixerio/src";
import es from "@elastic/elasticsearch";
import {get as config} from "config";
import "./types";
import {cors} from "../middleware/cors";

const apolloServer = new ApolloServer({
  schema: schema.buildSchema(),
  playground: {endpoint: config("API.URL") + "/graph"},
  context: async () => {

    const fixerio = new FixerApi();

    return ({
      currencies: await fixerio.currencies(),
      fixerio,
      elasticsearch: new es.Client({
        node: config("ELASTICSEARCH.HOST"),
        auth: {
          username: "elastic",
          password: config("ELASTICSEARCH.PASSWORD")
        }
      })
    });
  }
});

export const apolloHandler = apolloServer.createHandler({path: '/graph'});
const corsHandler = (req, res) => {
  return req.method === 'OPTIONS' ? res.end() : apolloHandler(req, res);
};
export const apolloWithCORS = cors()(corsHandler);
