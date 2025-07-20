import { jwtDecode } from 'jwt-decode';

export const safeDecode = <T = any>(token: string | null): T | null => {
  try {
    if (!token || token.split('.').length !== 3) return null;
    return jwtDecode<T>(token);
  } catch {
    return null;
  }
}
