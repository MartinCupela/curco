import {Stat, StatsRoot} from "./components/Layout";
import React from "react";
import {GetCurrenciesData} from "../../../../services/graphql/queries/Currency";

interface StatsBarProps {
  data: GetCurrenciesData;
}

const Stats = ({data}: StatsBarProps) => {
  return (
    <StatsRoot>
      <Stat>
        <div className={"number"}>{data.Stats.MostPopularCurrency.id}</div>
        <div className={"description"}>Most popular currency</div>
      </Stat>
      <Stat>
        <div className={"number"}>{data.Stats.totalRequests}</div>
        <div className={"description"}>Total requests</div>
      </Stat>
      <Stat>

        <div className={"number"}>{data.Stats.totalConverted}</div>
        <div className={"description"}>Total amount converted in USD</div>
      </Stat>
    </StatsRoot>
  )
}

export default Stats;