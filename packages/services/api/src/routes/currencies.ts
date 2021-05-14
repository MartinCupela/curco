import {IncomingMessage, ServerResponse} from "http";
import currencies from "../mock/currencies";


export default async (req: IncomingMessage, res: ServerResponse) => {
  return currencies;
}