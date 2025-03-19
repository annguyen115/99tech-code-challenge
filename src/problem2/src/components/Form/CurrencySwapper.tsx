import { FC } from 'react';
import { CurrencyInputField } from '@components/Input/CurrencyInputField.tsx';
import { TokenAutocomplete } from '@components/Input/TokenAutocomplete.tsx';
import { generateTokenList } from '@utils/token.ts';
import { TokenCode } from '@enums/token.ts';
import { Button, Typography } from '@mui/material';

export const CurrencySwapper: FC = () => {
  const fromOption = generateTokenList(TokenCode.BLUR);
  const toOption = generateTokenList(TokenCode.OKT);

  return (
    <div className='flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-3xl md:p-8'>
      <Typography variant='h3' gutterBottom>
        Currency Converter
      </Typography>

      <div className='flex justify-between items-start space-x-2'>
        <CurrencyInputField label='Enter the amount' name='amount' />

        <div className='flex justify-items-start items-center space-x-2'>
          <TokenAutocomplete label='From' name='from' options={fromOption} />
          <TokenAutocomplete label='To' name='to' options={toOption} />
        </div>
      </div>

      <div className='flex justify-between items-end'>
        <p className={'text-xl'}>
          100 bitcoin = 0.43242 USDT
        </p>

        <Button variant='contained' type='submit' size='large' className={'w-[200px] h-[56px]'}>Convert</Button>
      </div>
    </div>
  );
};