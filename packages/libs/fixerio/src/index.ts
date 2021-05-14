import {ErrorResponse, LatestRatesOptions, LatestRatesResponse, SupportedCurrenciesResponse} from "./types";
import {get as config} from "config";
import fetch from "node-fetch"

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

    const url = new URL("https://data.fixer.io/api" + endpoint);

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

  latestRates = async (options: LatestRatesOptions): Promise<LatestRatesResponse | ErrorResponse> => {
    return await this.request({endpoint: "/latest", searchParams: options as any});
  }

  currencies = async (): Promise<SupportedCurrenciesResponse | ErrorResponse> => {
    return await this.request({endpoint: "/symbols"});
  }
}

