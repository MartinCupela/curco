import React from 'react';
import {ApolloProvider} from "@apollo/client";
import client from "./services/apollo/client";
import {Routes} from "./services/routes";
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  </ApolloProvider>
)


export default App;
