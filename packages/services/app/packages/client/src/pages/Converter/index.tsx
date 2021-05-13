import React from "react";
import {PageBody, PageRoot} from "./components/Layout";
import ConverterForm from "./components/ConverterForm";
import StatsBar from "../../components/StatsBar";
import Header from "../../components/Header";


const CurrencyConverter = () => {
  return <PageRoot>
    <Header/>
    <PageBody>
      <ConverterForm currencies={[
        {currencyId: "USD", description: ""},
        {currencyId: "GBP", description: ""},
        {currencyId: "CZK", description: ""},
      ]}/>

    </PageBody>
    <StatsBar/>
  </PageRoot>
}

export default CurrencyConverter;