import {TextField} from "@material-ui/core";
import React from "react";
import {ButtonArea, CurrencyAutocomplete, Field, Fields, SwapIcon} from "./components/Layout";
import Panel from "../../../../components/Panel";
import {Button} from "../../../../components/Button";
import {buttonThemes} from "../../../../components/Button/themes";
import {ErrorText} from "../../../../components/Form/components/ErrorText";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";
import {Currency, useConverterFormController} from "./components/ConverterFormController";
import ConversionResult from "./components/ConversionResult";

interface ConverterFormProps {
  currencies: Currency[];
}

const ConverterForm = ({currencies}: ConverterFormProps) => {
  const {
    conversionResult,
    selected,
    errors,
    handleAmountInputChange,
    handleCurrencyFieldChange,
    handleSubmit,
    swapCurrencies
  } = useConverterFormController()


  return (
    <Panel>
      <Fields>
        <Field>
          <TextField label="Amount" defaultValue={selected.amount}
                     onChange={handleAmountInputChange}/>
          <ErrorText msg={errors.amount}/>
        </Field>
        <Field>
          <CurrencyAutocomplete
            autoHighlight
            value={selected.base}
            options={currencies}
            getOptionLabel={(option) => (option as Currency).currencyId}
            onChange={(event, value) => handleCurrencyFieldChange({value: value as any, field: "base"})}
            renderInput={(params) => <TextField {...params} label="From"/>}
          />
          <ErrorText msg={errors.base}/>
        </Field>
        <SwapIcon onClick={swapCurrencies}><SwapHorizontalCircleIcon/></SwapIcon>
        <Field>
          <CurrencyAutocomplete
            autoHighlight
            value={selected.quote}
            options={currencies.filter(c => c.currencyId !== selected.base?.currencyId)}
            getOptionLabel={(option) => (option as Currency).currencyId}
            onChange={(event, value) => handleCurrencyFieldChange({value: value as any, field: "quote"})}
            renderInput={(params) => <TextField {...params} label="To"/>}
          />
          <ErrorText msg={errors.quote}/>
        </Field>
      </Fields>
      <ButtonArea>
        <ConversionResult result={conversionResult}/>
        <Button onClick={handleSubmit} theme={buttonThemes.main}>Submit</Button>
      </ButtonArea>
    </Panel>
  );
}

export default ConverterForm;