import {FixerApi} from "@converter/libs.fixerio/src";
import es, {Client as ElasticClient} from "@elastic/elasticsearch";
import {get as config} from "config";

export interface Context {
  fixerio: FixerApi,
  elasticsearch: ElasticClient,
  currencies: {[id: string]: string} | null;
}

export const CONTEXT = {
  fixerio: new FixerApi(),
  elasticsearch: new es.Client({
    node: config("ELASTICSEARCH.HOST")
  })
}