import {get, router} from 'microrouter';
import convert from "./convert";
import currencies from "./currencies";
import {withContext} from "../middleware/withContext";

export default router (
  get("/convert", withContext(convert)),
  get("/currencies", withContext(currencies)),
)