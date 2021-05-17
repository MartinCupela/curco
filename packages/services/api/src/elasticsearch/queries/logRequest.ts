import {Client as ElasticClient} from "@elastic/elasticsearch";
import {v4 as uuid} from "uuid";
import {getUnixTime} from "date-fns"

interface LogRequestArgs {
  from: string;
  to: string;
  amount: number;
  elasticsearch: ElasticClient;
}

export default async function ({from, to, amount, elasticsearch}: LogRequestArgs) {
  await elasticsearch.index({
    index: "requests",
    id: uuid(),
    body: {
      from,
      to,
      amount,
      when: getUnixTime(new Date())
    }
  });
}