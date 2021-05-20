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
            <BaseCurrency title={result.from.description}> {result.amount} {result.from.description} =</BaseCurrency>
            <QuoteCurrency title={result.to.description}>{result.result} {result.to.description}</QuoteCurrency>
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
  overflow: hidden;
  text-overflow: fade;
`

export const BaseCurrency = styled.div`
  font-size: 18px;
  margin-bottom: .5rem;
  @media(max-width: 640px) {
    font-size: 16px;
  }
`

export const QuoteCurrency = styled.div`
  font-size: 28px;
  
  @media(max-width: 640px) {
    font-size: 20px;
  }
`
