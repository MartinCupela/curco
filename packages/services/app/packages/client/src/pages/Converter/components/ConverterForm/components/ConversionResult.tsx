import React from "react";
import {CurrencyConversionResult} from "./ConverterFormController";
import styled from "styled-components";
import {FadeInAnimation} from "../../../../../styles/animations";


interface ConversionResultProps {
  result: CurrencyConversionResult | null
}

const ConversionResult = ({result}: ConversionResultProps) => {
  return (
    <ResultRoot>
      {result ? (
          <>
            <BaseCurrency> {result.base.amount} {result.base.currency.description} =</BaseCurrency>
            <QuoteCurrency>{result.quote.amount} {result.quote.currency.description}</QuoteCurrency>
          </>
        )
        : null}
    </ResultRoot>
  )
}

export default ConversionResult;

export const ResultRoot = styled.div`
  font-weight: 700;
  ${FadeInAnimation};
  animation: fadeIn;
  animation-duration: 2s;
  white-space: nowrap;
`

export const BaseCurrency = styled.div`
  font-size: 18px;
`

export const QuoteCurrency = styled.div`
  font-size: 28px;
`
