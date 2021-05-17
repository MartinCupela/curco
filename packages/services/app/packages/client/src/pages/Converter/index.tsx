import React from "react";
import {PageBody, PageRoot} from "./components/Layout";
import ConverterForm from "./components/ConverterForm";
import StatsBar from "../../components/StatsBar";
import Header from "../../components/Header";
import {useQuery} from "@apollo/client";
import {getCurrencies, GetCurrenciesData} from "../../services/graphql/queries/Currency";
import LoadingConverter from "./LoadingConverter";
import ErrorConverter from "./ErrorConverter";


const CurrencyConverter = () => {
  const {loading, data, error} = useQuery<GetCurrenciesData>(getCurrencies, {variables: {currencyId: "USD"}})

  let content = <LoadingConverter/>
  if (error) {
    content = <ErrorConverter/>
  } else if (data) {
    content = <>
      <ConverterForm currencies={data.CurrencyList}/>
      <StatsBar data={data}/>
      </>
  }
  return <PageRoot>
    <Header/>
    <PageBody>{content}</PageBody>

  </PageRoot>
}

export default CurrencyConverter;