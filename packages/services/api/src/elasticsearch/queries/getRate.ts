import {FixerApi} from "@converter/libs.fixerio/src";
import {Client as ElasticClient} from "@elastic/elasticsearch";
import {LatestRatesResponse} from "@converter/libs.fixerio/src/types";

interface GetRateArgs {
  id: string;
  destCurrency: string;
  fixerio: FixerApi;
  elasticsearch: ElasticClient;
}

export default async function ({destCurrency, id, fixerio, elasticsearch}: GetRateArgs): Promise<number> {
  try {
    const rates = await elasticsearch.get({index: "rates", id});
    return rates.body._source[destCurrency] as number;
  } catch (e) {

    const result = await fixerio.latestRates();

    if (!result.success) {
      throw new Error("Failed to retrieve the exchange rates")
    }

    const rates = (result as LatestRatesResponse).rates;

    await elasticsearch.index({
      index: "rates",
      id,
      body: rates,
    });

    return rates[destCurrency];
  }
}