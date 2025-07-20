import {
  JsonWebTokenError,
  TokenExpiredError as JsonWebTokenExpiredError,
} from 'jsonwebtoken';
import {
  MissingTokenError,
  TokenExpiredError,
  TokenInvalidError,
} from '@error/AppError';
import { ErrorMessage } from '@error/ErrorCode';

export function catchVerifyTokenError(err: unknown): never {
  if (err instanceof JsonWebTokenExpiredError) {
    throw new TokenExpiredError(ErrorMessage.TOKEN_EXPIRED);
  }

  if (err instanceof JsonWebTokenError) {
    throw new TokenInvalidError(ErrorMessage.TOKEN_INVALID);
  }

  throw new MissingTokenError(ErrorMessage.MISSING_TOKEN);
}
