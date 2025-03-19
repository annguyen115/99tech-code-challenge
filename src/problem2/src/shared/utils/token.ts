import { TokenCode } from '@enums/token';
import { TokenOptions } from '@common-types/token.ts';
import { TokenNameMapping, TokenRateMapping } from '@constants/token.ts';

/**
 * Generates a list of token options excluding the currently selected token.
 *
 * @param {TokenCode} currentTokenSelected - The currently selected token code.
 * @returns {TokenOptions[]} The list of available token options.
 */
export const generateTokenList = (currentTokenSelected: TokenCode): TokenOptions[] => {
  return Object.keys(TokenNameMapping)
    .filter(code => code !== currentTokenSelected)
    .map<TokenOptions>(code => ({
      code: code,
      name: TokenNameMapping[code as TokenCode],
      image: `https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/${code}.svg`,
    }));
};

/**
 * Converts an amount from one token to another based on exchange rates.
 *
 * @param {number} amount - The amount to convert.
 * @param {TokenCode} from - The token code of the original currency.
 * @param {TokenCode} to - The token code of the target currency.
 * @returns {number} The converted amount in the target currency.
 */
export const convertTokenPrice = (amount: number, from: TokenCode, to: TokenCode): number => {
  const fromRate = TokenRateMapping[from];
  const toRate = TokenRateMapping[to];
  return (amount / fromRate) * toRate;
}