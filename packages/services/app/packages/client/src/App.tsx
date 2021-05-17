import {hot} from "react-hot-loader";
import React from 'react';
import {ApolloProvider} from "@apollo/client";
import client from "./services/graphql/client";
import { BrowserRouter } from 'react-router-dom';
import {Routes} from "./services/routes";
import {GlobalStyle} from "./styles/global";


const App = () => (<>
  <GlobalStyle/>
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  </ApolloProvider>
  </>
)

export default hot(module)(App);
