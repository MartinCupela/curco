import {StatsBarRoot} from "./components/Layout";
import React from "react";
import {GetCurrenciesData} from "../../services/graphql/queries/Currency";

interface StatsBarProps {
  data: GetCurrenciesData;
}
const StatsBar = ({data}: StatsBarProps) => {
  return (
    <StatsBarRoot>
      <div>Most popular currency: {data.Stats.MostPopularCurrency.id}</div>
      <div>Total requests: {data.Stats.totalRequests}</div>
      <div>Total amount of money converted: {data.Stats.totalConverted}</div>
    </StatsBarRoot>
  )
}

export default StatsBar;