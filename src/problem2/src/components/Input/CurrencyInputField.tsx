import * as React from 'react';
import { TextField } from '@mui/material';
import { NumberFormatValues, NumericFormat } from 'react-number-format';

export type CurrencyInputFieldProps = {
  name: string;
  label: string;
  className?: string;
  value?: number;
  errorMessage?: string;
  onValueChange?: (value: string) => void;
  onBlur?:(event: any) => void;
}

export const CurrencyInputField: React.FC<CurrencyInputFieldProps> = ({ value, onValueChange, label, name, className, errorMessage, onBlur }) => {
  const onChangeHandle = (values: NumberFormatValues) => {
    onValueChange && onValueChange(values.value);
  };

  return (
    <NumericFormat
      value={value}
      name={name}
      onValueChange={onChangeHandle}
      customInput={TextField}
      thousandSeparator
      valueIsNumericString
      prefix='$'
      variant='standard'
      label={label}
      className={className}
      error={Boolean(errorMessage)}
      helperText={errorMessage}
      onBlur={onBlur}
    />
  );
};