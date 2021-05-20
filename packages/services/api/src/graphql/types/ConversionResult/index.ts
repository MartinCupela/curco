import schema from "../../schema";
import convert from "./queries/convert";
import Currency from "../Currency";
import Stats, {getStatsSeed} from "../Stats";

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const Conversion = schema.createObjectTC({
  name: "Conversion",
  fields: {
    from: {
      type: () => Currency,
      resolve: (c) => c.from
    },
    to: {
      type: () => Currency,
      resolve: (c) => c.to
    },
    amount: {
      type: "String",
      resolve: (c) => c.amount
    },
    result: {
      type: "String",
      resolve: (c) => c.result
    },
    rate: {
      type: "String",
      resolve: (c) => c.rate
    },
    Stats: {
      type: Stats,
      resolve: ({Stats}) => Stats
    }
  }
});

schema.Query.addFields({
  Conversion: {
    type: () => Conversion,
    args: {
      from: {type: "String"},
      to: {type: "String"},
      amount: {type: "Float"},
    },
    resolve: async (_, args, context, info) => {
      let conversionResult = {};
      if (args.from && args.to) {
        conversionResult = await convert(_, args, context, info);
      }
      // todo: remove this dirty trick by implementing subscriptions for stats;
      await sleep(800);
      return ({
        ...conversionResult,
        Stats: getStatsSeed()
      });
    },
  }
});

export default Conversion;