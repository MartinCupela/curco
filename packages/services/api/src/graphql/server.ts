import {ApolloServer} from "apollo-server-micro";
import schema from "./schema";
import {get as config} from "config";
import "./types";
import cors from "micro-cors";
import {CONTEXT} from "./context";
import initIndices from "../elasticsearch/helpers/initIndices";


initIndices({
  indices: ["requests", "rates"],
  elasticsearch: CONTEXT.elasticsearch
})

const apolloServer = new ApolloServer({
  schema: schema.buildSchema(),
  playground: {endpoint: config("API.URL") + "/graph"},
  context: async () => ({
      currencies: await CONTEXT.fixerio.currencies(),
      ...CONTEXT
    })
});

export const apolloHandler = apolloServer.createHandler({path: '/graph'});
const corsHandler = (req, res) => {
  return req.method === 'OPTIONS' ? res.end() : apolloHandler(req, res);
};
export const apolloWithCORS = cors()(corsHandler);
