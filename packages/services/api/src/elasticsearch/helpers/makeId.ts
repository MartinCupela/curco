import {Currency} from "@converter/libs.fixerio/src/types";

interface MakeIdArgs {
  from: Currency;
  date: string;
}

export function makeRateId({from, date}: MakeIdArgs) {
  return `${from}-${date}`
}