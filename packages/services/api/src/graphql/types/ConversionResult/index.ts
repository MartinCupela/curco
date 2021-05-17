import schema from "../../schema";
import convert from "./queries/convert";
import Currency from "../Currency";


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
    }
  }
});

schema.Query.addFields({
  Conversion: {
    type: () => Conversion,
    args: {
      from: {type: "String!"},
      to: {type: "String!"},
      amount: {type: "Float"},
    },
    resolve: convert,
  }
});

export default Conversion;