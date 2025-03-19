import * as React from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import { TokenOptions } from '@common-types/token.ts';

export type TokenAutocompleteProps = {
  label: string;
  name: string;
  options: TokenOptions[];
  className?: string;
}

export const TokenAutocomplete: React.FC<TokenAutocompleteProps> = ({ name, label, options, className }) => {
  return (
    <Autocomplete
      id='token-autocomplete'
      sx={{ width: 300 }}
      options={options}
      autoHighlight
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