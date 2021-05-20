import {ApolloClient, InMemoryCache} from "@apollo/client";
const client = new ApolloClient({
  uri: `${CONFIG.API.URL}` + "/graph",
  cache: new InMemoryCache()
});

export default client;