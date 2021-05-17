import {ApolloClient, InMemoryCache} from "@apollo/client";
console.log(CONFIG.API.URL + "/graph")
const client = new ApolloClient({
  uri: CONFIG.API.URL + "/graph",
  cache: new InMemoryCache()
});

export default client;