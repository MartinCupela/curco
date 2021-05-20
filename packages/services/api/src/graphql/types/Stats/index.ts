import schema from "../../schema";

export interface CurrencyFields {
  id: string;
  description: string;
}

const PopularCurrency = schema.createObjectTC({
  name: "PopularCurrency",
  fields: {
    id: {
      type: "String",
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
        const apiResponse = await elasticsearch.search({
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
        const bucket = apiResponse.body.aggregations.quote_counts.buckets[0];
        const {key, doc_count} = bucket || {key: undefined, doc_count: 0};
        return {id: key, count: doc_count};
      }
    },
    totalConverted: {
      type: "Float",
      resolve: async (_, __, {elasticsearch}) => {
        const apiResponse = await elasticsearch.search({
          index: "requests",
          body: {
            "aggs": {
              "total_converted_USD": {
                "sum": {"field": "amountInUSD"}
              }
            }
          }
        });
        return apiResponse.body.aggregations.total_converted_USD.value.toFixed(4)
      }
    },
    totalRequests: {
      type: "Int",
      resolve: async (_, __, {elasticsearch}) => {
        const apiResponse = await elasticsearch.count({
          index: "requests",
          body: {
            query: {match_all: {}}
          }
        });
        return apiResponse.body.count;
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

