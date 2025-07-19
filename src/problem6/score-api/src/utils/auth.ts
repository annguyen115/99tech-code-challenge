import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { appConfig } from '@config';
import { UserPayload } from '@appTypes/user-payload';

const SALT_ROUNDS: number = appConfig.auth.salt || 10;

export type JwtExpiresIn = `${number}${'s' | 'm' | 'h' | 'd'}` | number;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const verifyToken = (token: string) =>
  jwt.verify(token, appConfig.auth.secret);

export const signToken = (payload: UserPayload, expiresIn: JwtExpiresIn) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { exp, iat, ...rest } = payload;
  return jwt.sign(rest, appConfig.auth.secret, { expiresIn });
};
