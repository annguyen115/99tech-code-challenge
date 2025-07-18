import { z } from 'zod';
import { appConfig } from '@config/config';

export const TokenKeySchema = z.object({
  access: z.string(),
  refresh: z.string(),
});

const TOKEN_KEYS = TokenKeySchema.parse({
  access: appConfig.REACT_APP_ACCESS_TOKEN_KEY,
  refresh: appConfig.REACT_APP_REFRESH_TOKEN_KEY,
});

const TokenSchema = z.object({
  [TOKEN_KEYS.access]: z.string(),
  [TOKEN_KEYS.refresh]: z.string(),
});

export const getTokens = () => {
  const accessToken = localStorage.getItem(TOKEN_KEYS.access);
  const refreshToken = localStorage.getItem(TOKEN_KEYS.refresh);
  
  const result = TokenSchema.safeParse({
    [TOKEN_KEYS.access]: accessToken,
    [TOKEN_KEYS.refresh]: refreshToken,
  });
  
  return result.success ? result.data : null;
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(TOKEN_KEYS.access, accessToken);
  localStorage.setItem(TOKEN_KEYS.refresh, refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEYS.access);
  localStorage.removeItem(TOKEN_KEYS.refresh);
};

export const getTokenKeys = () => TOKEN_KEYS;
