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

const Stats = schema.createObjectTC({
  name: "Stats",
  fields: {
    MostPopularCurrency: {
      type: 'PopularCurrency',
      resolve: async (_, __, {elasticsearch}) => {
        const result = await elasticsearch.search({
          index: "requests",
          body: {
            "aggs": {
              "quote_counts": {
                "terms": {
                  "field": "to.keyword",
                  "order": {
                    "_count": "desc"
                  }
                }
              }

            }
          }
        });
        const {key, doc_count} = result.body.aggregations.quote_counts.buckets[0];
        return {id: key, count: doc_count};
      }
    },
    totalConverted: {
      type: "Float",
      resolve: async (_, __, {elasticsearch}) => {
        const a = await elasticsearch.search({
          index: "requests",
          body: {
            "aggs": {
              "total_converted_USD": {
                "sum": {"field": "amountInUSD"}
              }
            }
          }
        });
        return a.body.aggregations.total_converted_USD.value.toFixed(4)
      }
    },
    totalRequests: {
      type: "Int",
      resolve: async (_, __, {elasticsearch}) => {
        const r = await elasticsearch.count({
          index: "requests",
          body: {
            query: {match_all: {}}
          }
        });
        return r.body.count;
      }
    }
  }
});

export const getStatsSeed = () => ({
  MostPopularCurrency: undefined,
  totalConverted: undefined,
  totalRequests: undefined,
})

schema.Query.addFields({

  Stats: {
    type: "Stats",
    args: {},
    resolve: getStatsSeed
  }

});




export default Stats;

