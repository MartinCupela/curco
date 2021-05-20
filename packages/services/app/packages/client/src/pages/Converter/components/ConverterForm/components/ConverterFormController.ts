import React, {useState} from "react";
import {Currency} from "../../../../../services/graphql/queries/Currency";
import {useLazyQuery} from "@apollo/client";
import {
  ConversionArgs,
  ConversionResult,
  ConversionResultData,
  convert as convertQuery
} from "../../../../../services/graphql/queries/ConversionResult";
import {ApolloError} from "@apollo/client/errors";


type CurrencyWithAmount = { amount: string, currency: Currency }

export interface CurrencyConversionResult {
  base: CurrencyWithAmount;
  quote: CurrencyWithAmount;
}

type FieldName = "amount" | "base" | "quote"


type ErrorState = { [fieldName in FieldName]?: string | undefined };

interface ConverterFormValues {
  amount: string | null;
  base: Currency | null;
  quote: Currency | null;
}


interface ConverterFormController {
  conversionResult: ConversionResult | null;
  selected: ConverterFormValues;
  errors: ErrorState;
  loading: boolean;
  apolloError?: ApolloError;


  handleAmountInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;

  handleCurrencyFieldChange(args: HandleCurrencyFieldChangeArgs): void;

  swapCurrencies(): void;

  handleSubmit(): void;

}

interface HandleCurrencyFieldChangeArgs {
  value?: Currency;
  field: "base" | "quote";
}


export const useConverterFormController = (currencies: Currency[]): ConverterFormController => {
  const [selected, setSelected] = useState<ConverterFormValues>({amount: "1", base: null, quote: null});
  const [errors, setError] = useState<ErrorState>({});
  const [convert, {data, loading, error}] = useLazyQuery<ConversionResultData, ConversionArgs & {currencyId: string}>(convertQuery);

  const validateAmountValue = (value: string): string | undefined => {
    const isFloatString = value.match(/^\d+(\.{1}\d*)?$/);
    if (!isFloatString) {
      return "Please enter a valid amount";
    }
  }

  const validateSubmit = (values: ConverterFormValues): ErrorState => {
    return {
      amount: !values.amount ? "Amount is required" : undefined,
      base: !values.base ? "Base currency is required" : undefined,
      quote: !values.quote ? "Quote currency is required" : undefined,
    }
  }

  const handleAmountInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    let errMsg;
    const value = e.target.value as string;
    if (value) {
      errMsg = validateAmountValue(value);
    } else {
      setSelected({...selected, amount: null})
    }

    if (errMsg) {
      setError({...errors, amount: errMsg})
    } else {
      setSelected({...selected, amount: value});
      if (errors.amount) {
        setError({...errors, amount: undefined});

      }
    }
  }

  const handleCurrencyFieldChange = ({value, field}: HandleCurrencyFieldChangeArgs) => {
    if (value) {
      setSelected({
        ...selected,
        [field]: {id: value?.id, description: value?.description}
      });

      if (errors[field]) {
        setError({...errors, [field]: undefined});
      }
    } else {
      setSelected({
        ...selected,
        [field]: null
      })
    }
  }


  return {
    errors,
    selected,
    loading,
    apolloError: error,
    conversionResult: data?.Conversion || null,
    handleAmountInputChange,
    handleCurrencyFieldChange,
    swapCurrencies: () => setSelected({amount: selected.amount, base: selected.quote, quote: selected.base}),
    handleSubmit: () => {
      const submissionErrors = validateSubmit(selected)
      if (Object.values(submissionErrors).some(v => v)) {
        setError(submissionErrors);
      } else {
        convert({
          variables: {
            from: selected.base?.id as string,
            to: selected.quote?.id as string,
            amount: selected.amount ? parseFloat(selected.amount) : undefined,
            currencyId: "USD"
          }
        })
      }
    }
  }
}