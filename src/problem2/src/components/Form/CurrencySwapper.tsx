import { FC, useState } from 'react';
import { CurrencyInputField } from '@components/Input/CurrencyInputField.tsx';
import { TokenAutocomplete } from '@components/Input/TokenAutocomplete.tsx';
import { convertTokenPrice, generateTokenList } from '@utils/token.ts';
import { TokenCode } from '@enums/token.ts';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import { CurrencySwapperValidation } from '@/validations/CurrencySwapper.ts';
import { CurrencySwapperValues } from '@common-types/form.ts';
import { getFormErrorMessage } from '@utils/form.ts';
import { TokenNameMapping } from '@constants/token.ts';

export const CurrencySwapper: FC = () => {
  const [convertResult, setConvertResult] = useState<number | undefined>(undefined);

  const onSubmittedHandle = (fromValue: CurrencySwapperValues) => {
    const { amount, from, to } = fromValue;
    const result = convertTokenPrice(amount!, from, to);
    setConvertResult(result);
  };

  const { values, errors, touched, handleSubmit, handleBlur, setFieldValue } = useFormik<CurrencySwapperValues>({
    initialValues: {
      from: TokenCode.BLUR,
      to: TokenCode.OKT,
    },
    validationSchema: CurrencySwapperValidation,
    onSubmit: onSubmittedHandle,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
  });

  const fromOption = generateTokenList(values.to);
  const toOption = generateTokenList(values.from);

  return (
    <form onSubmit={handleSubmit}>
      <div className='rounded-3xl bg-white p-6 shadow-3xl md:p-8 space-y-3'>
        <p className='text-3xl md:text-4xl font-bold'>Currency Converter</p>
        <div className='grid grid-cols-3 gap-x-4 gap-y-6'>
          <CurrencyInputField
            className='col-span-3 md:col-span-1'
            label='Enter the amount'
            name='amount'
            value={values.amount}
            onBlur={handleBlur}
            errorMessage={getFormErrorMessage(errors.amount, touched.amount)}
            onValueChange={value => setFieldValue('amount', value)}
          />

          <TokenAutocomplete
            className='col-span-3 md:col-span-1'
            label='From'
            name='from'
            options={fromOption}
            value={values.from}
            onValueChange={value => setFieldValue('from', value)}
            onBlur={handleBlur}
            errorMessage={getFormErrorMessage(errors.from, touched.from)}
          />

          <TokenAutocomplete
            className='col-span-3 md:col-span-1'
            label='To' name='to'
            options={toOption}
            value={values.to}
            onValueChange={value => setFieldValue('to', value)}
            onBlur={handleBlur}
            errorMessage={getFormErrorMessage(errors.to, touched.to)}
          />
        </div>

        <div className='flex justify-between items-end space-x-2'>
          {convertResult && (
            <p className={'text-xl'}>
              {values.amount} {TokenNameMapping[values.from]} = {convertResult} {TokenNameMapping[values.to]}
            </p>
          )}

          <Button
            variant='contained'
            type='submit'
            size='large'
            className={'w-[200px] h-[56px]'}
          >
            Convert
          </Button>
        </div>
      </div>
    </form>
  );
};