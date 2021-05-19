import {Client as ElasticClient} from "@elastic/elasticsearch";
import {v4 as uuid} from "uuid";
import {getUnixTime} from "date-fns"

interface LogRequestArgs {
  from: string;
  to: string;
  amount: number;
  amountInUSD: number;
  elasticsearch: ElasticClient;
}

export default async function ({from, to, amount, amountInUSD, elasticsearch}: LogRequestArgs) {
  await elasticsearch.index({
    index: "requests",
    id: uuid(),
    body: {
      from,
      to,
      amount,
      amountInUSD,
      when: getUnixTime(new Date())
    }
  });
}