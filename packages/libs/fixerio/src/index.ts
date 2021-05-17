import {ErrorResponse, LatestRatesResponse, SupportedCurrenciesResponse} from "./types";
import {get as config} from "config";
import fetch from "node-fetch"
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "fs";
import {dirname} from "path";

export type SearchParams = { [param: string]: string }

interface RequestOptions {
  endpoint: string;
  searchParams?: SearchParams;
}

export class FixerApi {
  private API_KEY: string | undefined = config("API.API_KEY");

  private makeURL({endpoint, searchParams}: RequestOptions): string {
    if (!this.API_KEY) {
      throw new Error("Missing API KEY");
    }

    const url = new URL("http://data.fixer.io/api" + endpoint);

    Object.entries({...searchParams, access_key: this.API_KEY}).forEach(
      ([key, value]) => url.searchParams.set(key, value)
    );

    return url.toString();
  }

  request = async (options: RequestOptions) => {
    const res = await fetch(
      this.makeURL(options),
      {
        method: "GET",
        headers: {
          'Accept': 'application/json',
        }
      });

    return await res.json();

  }

  latestRates = async (): Promise<LatestRatesResponse | ErrorResponse> => {
    return await this.request({endpoint: "/latest"});
  }

  currencies = async (): Promise<SupportedCurrenciesResponse | ErrorResponse> => {
    const cacheFilePath = "./.cache/currencies.json"
    let result;
    if (!existsSync(cacheFilePath)) {
        mkdirSync(dirname(cacheFilePath), {recursive: true});
        const data = await this.request({endpoint: "/symbols"});
        if (data.success) {
          writeFileSync(cacheFilePath, JSON.stringify(data.symbols))
          result= {success: true, symbols: data.symbols};
        } else {
          return data as ErrorResponse;
        }
    } else {
      result = {success: true, symbols: JSON.parse(readFileSync(cacheFilePath).toString())};
    }


    return result as SupportedCurrenciesResponse;
  }
}

