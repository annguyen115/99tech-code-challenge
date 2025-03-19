import * as yup from 'yup';

export const CurrencySwapperValidation = yup.object({
  amount: yup.number().required(),
  from: yup.string().required(),
  to: yup.string().required(),
})