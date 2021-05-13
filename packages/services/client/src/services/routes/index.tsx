import React from "react";
import { Route, Switch } from 'react-router-dom';
import Converter from "../../pages/Converter";

export const Routes = () => (
  <Switch>
    <Route path={"/convert"} component={Converter}/>
  </Switch>
)