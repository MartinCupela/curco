import React, {Dispatch, useState} from "react";

export type Currency = {
  currencyId: string;
  description: string;
}

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


interface ConverterFormState {
  conversionResult: CurrencyConversionResult;
  selected: ConverterFormValues;
  setSelected: Dispatch<ConverterFormValues>;
  errors: ErrorState;
  setError: Dispatch<ErrorState>;
}

interface ConverterFormController {
  conversionResult: CurrencyConversionResult;
  selected: ConverterFormValues;
  errors: ErrorState;

  handleAmountInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;

  handleCurrencyFieldChange(args: HandleCurrencyFieldChangeArgs): void;

  swapCurrencies(): void;

  handleSubmit(): void;

}

interface HandleCurrencyFieldChangeArgs {
  value?: Currency;
  field: "base" | "quote";
}

interface ValidateSubmissionArgs {
  values: ConverterFormValues,
  setError: Dispatch<ErrorState>
}

export const useConverterFormController = (): ConverterFormController => {
  const [selected, setSelected] = useState<ConverterFormValues>({amount: "1", base: null, quote: null});
  const [errors, setError] = useState<ErrorState>({});
  const [conversionResult, setConversionResult] = useState<number | null>(null);

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
    } else if (errors.amount) {
      setError({...errors, amount: undefined});
      setSelected({...selected, amount: value})
    }
  }

  const handleCurrencyFieldChange = ({value, field}: HandleCurrencyFieldChangeArgs) => {
    setSelected({
      ...selected,
      [field]: value
    });
  }


  return {
    errors,
    selected,
    conversionResult: {
      base: {amount: "23.00", currency: {description: "US Dollar", currencyId: "USD"}},
      quote: {amount: "18.93", currency: {description: "Euro", currencyId: "EUR"}}
    },
    handleAmountInputChange,
    handleCurrencyFieldChange,
    swapCurrencies: () => setSelected({amount: selected.amount, base: selected.quote, quote: selected.base}),
    handleSubmit: () => {
      const submissionErrors = validateSubmit(selected)
      if (Object.keys(submissionErrors).length) {
        setError(submissionErrors);
      } else {
        // lazyQuery.then(r => setConversionResult(r))
      }
    }
  }
}