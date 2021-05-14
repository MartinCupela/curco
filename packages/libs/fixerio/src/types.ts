export type Currency = string;

export interface LatestRatesOptions {
  base: Currency;
  symbols: Currency[];
}

export interface ConvertOptions {
  from: Currency;
  to: Currency;
  amount: string;
}

export interface BaseResponsePayload {
  success: boolean
}


export interface LatestRatesResponse extends BaseResponsePayload{
  "timestamp": number,
  "base": Currency,
  "date": string,
  "rates": { [currency: string]: number }
}

export interface SupportedCurrenciesResponse extends BaseResponsePayload {
  symbols: { [currency: string]: string }
}

export interface ErrorResponse extends BaseResponsePayload{
  error: {
    code: number;
    type: string;
    info: string;
  }
}