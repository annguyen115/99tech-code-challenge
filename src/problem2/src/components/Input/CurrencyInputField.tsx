import * as React from 'react';
import { Input, InputLabel } from '@mui/material';

export type CurrencyInputFieldProps = {
  name: string;
  label: string;
}

export const CurrencyInputField: React.FC<CurrencyInputFieldProps> = ({ label, name }) => {
  return (
    <div>
      <InputLabel htmlFor='amount'>
        {label}
      </InputLabel>
      <Input
        id='amount'
        name={name}
      />
    </div>
  );
};