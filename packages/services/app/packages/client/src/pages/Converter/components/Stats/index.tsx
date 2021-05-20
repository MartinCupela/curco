import {Stat, StatsRoot} from "./components/Layout";
import React from "react";
import {Stats as StatsData} from "../../../../services/graphql/queries/Currency";

interface StatsBarProps {
  data: StatsData;
}

const Stats = ({data: {MostPopularCurrency, totalConverted, totalRequests}}: StatsBarProps) => {
  return (
    <StatsRoot>
      <Stat>
        <div className={"number"}>{MostPopularCurrency.id || "?"}</div>
        <div className={"description"}>Most popular currency</div>
      </Stat>
      <Stat>
        <div className={"number"}>{totalRequests}</div>
        <div className={"description"}>Total requests</div>
      </Stat>
      <Stat>

        <div className={"number"}>{totalConverted}</div>
        <div className={"description"}>Total amount converted in USD</div>
      </Stat>
    </StatsRoot>
  )
}

export default Stats;