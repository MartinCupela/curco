import schema from "../../schema";

export interface CurrencyFields {
  id: string;
  description: string;
}

const PopularCurrency = schema.createObjectTC({
  name: "PopularCurrency",
  fields: {
    id: {
      type: "String!",
      resolve: c => c.id
    },
    count: {
      type: "Int!",
      resolve: c => parseInt(c.count)
    },
  }
})

const Currency = schema.createObjectTC({
  name: "Currency",
  fields: {
    id: {
      type: "String!",
      resolve: c => c.id
    },
    description: {
      type: "String!",
      resolve: c => c.description
    },
  }
});

schema.Query.addFields({
  CurrencyList: {
    type: '[Currency]',
    resolve: async (_, __, {fixerio}) => {
      const fixerResult = await fixerio.currencies();

      if (!fixerResult.success) {
        throw new Error("Failed to retrieve the currency list");
      }

      return Object.entries(fixerResult.symbols).map(([id, description]) => ({id, description}))
    }
  }
});



export default Currency;