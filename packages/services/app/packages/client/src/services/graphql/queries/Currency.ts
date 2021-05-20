import gql from "graphql-tag";

export type Currency = {
  id: string;
  description: string;
}

export type Stats = {
  MostPopularCurrency: { id: string; count: number };
  totalConverted: number;
  totalRequests: number;
}

export interface GetCurrenciesData {
  CurrencyList: Currency[];
  Conversion: { Stats: Stats };
}

export const getCurrencies = gql`
  query GetCurrencies {
    CurrencyList {
      id
      description
    }
    Conversion {
      Stats {
        MostPopularCurrency {
          id
          count
        }
        totalConverted
        totalRequests 
      }
    }
    
      
  }
`