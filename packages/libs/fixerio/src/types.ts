export type Currency = string;

export interface ConvertOptions {
  from: Currency;
  to: Currency;
  amount: string;
}

export interface BaseResponsePayload {
  success: boolean
}


export interface LatestRatesResponse extends BaseResponsePayload{
  success: true;
  "timestamp": number,
  "base": Currency,
  "date": string,
  "rates": { [currency: string]: number }
}

export interface SupportedCurrenciesResponse extends BaseResponsePayload {
  success: true;
  symbols: { [currency: string]: string }
}

export interface ErrorResponse {
  success: false;
  error: {
    code: number;
    type: string;
    info: string;
  }
}