import styled from "styled-components";
import {Autocomplete} from "@material-ui/lab";
import {Button} from "../../../../../components/Button";
import Panel from "../../../../../components/Panel";

export const ConverterFormPanel = styled(Panel)`
  margin-top: 2rem;
  @media(max-width: 640px) {
    width: 100%;
  }
`

export const Fields = styled.div`
  display: grid;
  grid-template-columns: 5fr 5fr 1fr 5fr;
  grid-template-rows: auto;
  grid-column-gap: 1rem;
  align-items: center;
  justify-content: center;

  min-width: 30rem;
  margin-bottom: 2rem;
  
  @media(max-width: 640px) {
    display: flex;
    flex-direction: column;
    
    & > :first-child {
      margin-bottom: 3rem;
      width: 100%;
    }
    
    & > * {
      width: 100%;
    }
    min-width: unset;
  }
`

export const CurrencyAutocomplete = styled(Autocomplete)`
  min-width: 10rem;
`

export const Field = styled.div``

export const ButtonArea = styled.div`
  display: flex; justify-content: space-between;
  flex-wrap: wrap;
  
  @media(max-width: 640px) {
    & > :first-child {
      margin: 0 2rem 2rem 0;
    }
  }
`

export const SubmitButton = styled(Button)`
  width: 8rem;
`

export const SwapIcon = styled.span`
  display: flex;
  justify-content: center; align-items: center;
  
  & > svg:active {
      color: darkgrey;
    }
  & > svg {
    border-radius: 50%;
    transition: background-color 0.3s ease-out;
    
    @media(max-width: 640px) {
      transform: rotate(90deg);
      margin-top: 2rem;
      font-size: 40px;
    }
  }
  
 
`