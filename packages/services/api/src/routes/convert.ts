import {IncomingMessage, ServerResponse} from "http";
import {SearchParams} from "@converter/libs.fixerio";
import {ConvertOptions, ErrorResponse, LatestRatesResponse} from "@converter/libs.fixerio/src/types";
import {RequestHandlerContext} from "../middleware/types";
import {ConvertSuccessResponse} from "./types";
import {format, getUnixTime} from "date-fns"

function getParams<T extends {} = {}>(req: IncomingMessage): T {
  if (req.url) {
    const url = new URL(req.url, 'https://example.org/');
    const obj: SearchParams = {};
    url.searchParams.forEach(((value, key) => obj[key] = value));
    return obj as T;
  }
  return {} as T;
}

export default async (
  req: IncomingMessage,
  res: ServerResponse,
  ctx: RequestHandlerContext
): Promise<ConvertSuccessResponse | ErrorResponse> => {

  const params: ConvertOptions = getParams(req);
  if (!params.from) {
    throw new Error("Missing required param 'from'")
  }
  if (!(params.to)) {
    throw new Error("Missing required param 'to'")
  }

  if (!params.amount) {
    params.amount = "1";
  }

  const date = format(new Date(), "YYYY-MM-DD");
  const timestamp = getUnixTime(new Date());

  // todo: check in elasticsearch if already available
  const cachedSearchResult = await ctx.elasticSearch.search({
    index: 'rates',
    body: {
      query: {
        match: {hello: 'world'}
      }
    }
  })

  const result = {
    success: true,
    query: params,
    info: {
      timestamp,
      rate: 0
    },
    date,
    result: 0
  }

  if (cachedSearchResult.hits) {
    result.info.rate = cachedSearchResult.hits.hits[0].fields.rate;
  } else {
    // if not available download the latest rates for today
    const latestRatesResponse = await ctx.fixerio.latestRates({
      base: params.from,
      symbols: [params.to]
    });

    if (latestRatesResponse.success) {
      result.info.rate = (latestRatesResponse as LatestRatesResponse).rates[0];
      // store rate in ES
      const toBeCached = {
        from: params.from,
        to: params.to,
        rate: (latestRatesResponse as LatestRatesResponse).rates[0],
        date
      }
      await ctx.elasticSearch.index({
        index: "rates",
        type: "Rate",
        body: toBeCached
      });
    } else {
      // return error response
      return latestRatesResponse as ErrorResponse;
    }
  }

  // convert
  result.result = parseFloat(params.amount) * result.info.rate

  return result as ConvertSuccessResponse;


}