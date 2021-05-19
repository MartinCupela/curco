import {TextField} from "@material-ui/core";
import React from "react";
import {ButtonArea, CurrencyAutocomplete, Field, Fields, SubmitButton, SwapIcon} from "./components/Layout";
import Panel from "../../../../components/Panel";
import {buttonThemes} from "../../../../components/Button/themes";
import {ErrorText} from "../../../../components/Form/components/ErrorText";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";
import {useConverterFormController} from "./components/ConverterFormController";
import ConversionResultArea from "./components/ConversionResultArea";
import {Currency} from "../../../../services/graphql/queries/Currency";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";

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
    swapCurrencies,
    loading,
    apolloError
  } = useConverterFormController(currencies)

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
            getOptionLabel={(option) => (option as Currency).id}
            getOptionSelected={(option, value) => (option as Currency).id === (value as Currency).id }
            onInputChange={(event, value) => handleCurrencyFieldChange({value: value as any, field: "base"})}
            renderInput={(params) => <TextField {...params} label="From"/>}
          />
          <ErrorText msg={errors.base}/>
        </Field>
        <SwapIcon onClick={swapCurrencies}><SwapHorizontalCircleIcon/></SwapIcon>
        <Field>
          <CurrencyAutocomplete
            autoHighlight
            value={selected.quote}
            options={currencies.filter(c => c.id !== selected.base?.id)}
            getOptionLabel={(option) => (option as Currency).id}
            getOptionSelected={(option, value) => (option as Currency).id === (value as Currency).id }
            onInputChange={(event, value) => handleCurrencyFieldChange({value: value as any, field: "quote"})}
            renderInput={(params) => <TextField {...params} label="To"/>}
          />
          <ErrorText msg={errors.quote}/>
        </Field>
      </Fields>
      <ButtonArea>
        <ConversionResultArea result={conversionResult}/>
        <SubmitButton onClick={handleSubmit} theme={buttonThemes.main}
                disabled={Object.values(errors).some(v => v)}>
          {loading ? <FontAwesomeIcon icon={faCircleNotch} spin/> : "Submit"}
        </SubmitButton>
      </ButtonArea>
    </Panel>
  );
}

export default ConverterForm;