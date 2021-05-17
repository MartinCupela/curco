import gql from "graphql-tag";

export type Currency = {
  id: string;
  description: string;
}

export interface GetCurrenciesData {
  CurrencyList: Currency[];
}

export const getCurrencies = gql`
  query GetCurrencies {
    CurrencyList {
      id
      description
    }
  }
`