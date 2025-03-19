import * as React from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import { TokenOptions } from '@common-types/token.ts';

export type TokenAutocompleteProps = {
  label: string;
  name: string;
  options: TokenOptions[];
  value: string;
  className?: string;
  errorMessage?: string;
  onValueChange? : (value: string) => void;
  onBlur?:(event: any) => void;
}

export const TokenAutocomplete: React.FC<TokenAutocompleteProps> = ({ value, onValueChange, onBlur, label, options, className, errorMessage }) => {
  const onChangedHandle = (_: any, inputValue: string | null) => {
    const tokenCode = options.find(option => option.name === inputValue)
    tokenCode && onValueChange && onValueChange(tokenCode.code);
  }

  return (
    <Autocomplete
      id='token-autocomplete'
      sx={{ width: 300 }}
      options={options}
      autoHighlight
      value={options.find(option => option.code === value)}
      onInputChange={onChangedHandle}
      getOptionLabel={(option) => option.name}
      className={className}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const { name, image } = option;
        return (
          <Box
            key={key}
            component='li'
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading='lazy'
              width='20'
              src={image}
              alt={`Token ${name} logo`}
            />
            {option.code} ({option.name})
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={Boolean(errorMessage)}
          helperText={errorMessage}
          onBlur={onBlur}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            },
          }}
        />
      )}
    />
  );
};