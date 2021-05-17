import {FixerApi} from "@converter/libs.fixerio/src";
import {Client as ElasticClient} from "@elastic/elasticsearch";

export interface Context {
  fixerio: FixerApi,
  elasticsearch: ElasticClient,
  currencies: {[id: string]: string} | null;
}