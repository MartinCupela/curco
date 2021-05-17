import React from "react";
import styled from "styled-components";
import {FadeInAnimation} from "../../../../../styles/animations";
import {ConversionResult} from "../../../../../services/graphql/queries/ConversionResult";


interface ConversionResultProps {
  result: ConversionResult | null
}

const ConversionResultArea = ({result}: ConversionResultProps) => {
  return (
    <ResultRoot>
      {result ? (
          <>
            <BaseCurrency> {result.amount} {result.from.description} =</BaseCurrency>
            <QuoteCurrency>{result.result} {result.to.description}</QuoteCurrency>
          </>
        )
        : null}
    </ResultRoot>
  )
}

export default ConversionResultArea;

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
