import {RequestHandler, RequestHandlerContext, RequestHandlerWithContext} from "./types";
import {FixerApi} from "@converter/libs.fixerio/src";
import es from "elasticsearch";
import {get as config} from "config";

const ctx: RequestHandlerContext = {
  fixerio: new FixerApi(),
  elasticSearch: new es.Client({
    host: config("ELASTICSEARCH.HOST")
  })
}

export const withContext = (fn: RequestHandlerWithContext): RequestHandler => (
  async (req, res) => await fn(req, res, ctx)
);