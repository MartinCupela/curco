import gql from "graphql-tag";

export type Currency = {
  id: string;
  description: string;
}

export interface GetCurrenciesData {
  CurrencyList: Currency[];
  Stats: {
    MostPopularCurrency: { id: string; count: number };
    totalConverted: number;
    totalRequests: number;
  }

}

export const getCurrencies = gql`
  query GetCurrencies {
    CurrencyList {
      id
      description
    }
    Stats {
      MostPopularCurrency {
        id
        count
      }
      totalConverted
      totalRequests 
    }
      
  }
`