import { TokenCode } from '@enums/token.ts';

export type CurrencySwapperValues = {
  amount?: number;
  from: TokenCode;
  to: TokenCode;
}
