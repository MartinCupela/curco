import React, {ReactNode} from "react";
import {ApolloProvider} from "@apollo/client";
import client from "./client";

interface MyApolloProviderProps {
  children?: ReactNode
}

const MyApolloProvider = ({children}: MyApolloProviderProps) => <ApolloProvider client={client}>{children}</ApolloProvider>

export default MyApolloProvider;