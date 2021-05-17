import {get, post, options, router} from 'microrouter';
import {apolloHandler, apolloWithCORS} from "../graphql/server";

export default router (
  post("/graph", apolloWithCORS),
  get("/graph", apolloHandler),
  options("/graph", apolloWithCORS)
)

