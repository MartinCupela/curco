import {IncomingMessage, ServerResponse} from "http";
import {FixerApi} from "@converter/libs.fixerio/src";
import {Client as ElasticClient} from 'elasticsearch';

export interface RequestHandlerContext {
  fixerio: FixerApi,
  elasticSearch: ElasticClient
}
export type RequestHandler = (req: IncomingMessage, res: ServerResponse) => Promise<ServerResponse>;
export type RequestHandlerWithContext = (req: IncomingMessage, res: ServerResponse, ctx:RequestHandlerContext) => Promise<ServerResponse>;