import {gql} from "graphql-tag";
import {Currency} from "./Currency";

export const getLatestRates = gql`
  query LatestRates($from:String!, $to:[String]!) {
    latestRates(from:$from, to:$to) {
      ConversionResult {
        currencyId
        quotes
        date
      }
    }
  }
`

export interface ConversionArgs {
  from: string;
  to: string;
  amount?: number
}

export type ConversionResult = {
  result: number;
  from: Currency;
  to: Currency;
  amount: number;
  rate: number;
}

export interface ConversionResultData {
  Conversion: ConversionResult
}

export const convert = gql`
  query ConvertCurrency($amount: Float!, $from:String!, $to:String!) {
    Conversion(amount: $amount, from:$from, to:$to) {
        from { id description }
        to { id description }
        amount
        result
        rate     
    }
  }
`