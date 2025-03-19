import { TokenCode } from '@enums/token';
import { TokenOptions } from '@common-types/token.ts';
import { TokenNameMapping } from '@constants/token.ts';

export const generateTokenList = (currentTokenSelected: TokenCode): TokenOptions[] => {
  return Object.keys(TokenNameMapping)
    .filter(code => code !== currentTokenSelected)
    .map<TokenOptions>(code => ({
      code: code,
      name: TokenNameMapping[code as TokenCode],
      image: `https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/${code}.svg`,
    }));
};