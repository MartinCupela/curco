import {makeRateId} from "../../../../elasticsearch/helpers/makeId";
import {format} from "date-fns"
import {GraphQLFieldResolver} from "graphql";
import {Context} from "../../../context";
import {ConversionArgs} from "../../../../types";
import getRate from "../../../../elasticsearch/queries/getRate";
import logRequest from "../../../../elasticsearch/queries/logRequest";
import {CurrencyFields} from "../../Currency";

interface Conversion {
  from: CurrencyFields;
  to: CurrencyFields;
  amount: number;
  rate: number;
  result: number;
}


const convert: GraphQLFieldResolver<null, Context, ConversionArgs> =
  async (_, {from, to, amount}, {fixerio, elasticsearch}): Promise<Conversion> => {

    if (!from) {
      throw new Error("Missing required param 'from'")
    }
    if (!(to)) {
      throw new Error("Missing required param 'to'")
    }

    const _amount = amount || 1;
    const date = format(new Date(), "yyyy-MM-dd");
    const rateId = makeRateId({from, date});

    await logRequest({from, to, amount: _amount, elasticsearch});

    const rate = await getRate({id: rateId, destCurrency: to, fixerio, elasticsearch})

    return {
      from: {id: from, description: ""},
      to: {id: from, description: ""},
      rate,
      amount: _amount,
      result: _amount * rate
    }

  };

export default convert;