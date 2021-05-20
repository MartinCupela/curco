import {ApolloClient, defaultDataIdFromObject, IdGetterObj, InMemoryCache} from "@apollo/client";
import {StoreObject} from "@apollo/client/utilities";

const client = new ApolloClient({
  uri: `${CONFIG.API.URL}` + "/graph",
  cache: new InMemoryCache({
    dataIdFromObject: (obj: Readonly<StoreObject>) => {
      if (obj.__typename === "Conversion") {
        return obj.__typename
      }
      return defaultDataIdFromObject(obj)
    }
  })
});

export default client;