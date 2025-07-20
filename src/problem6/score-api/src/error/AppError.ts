import { ErrorCode } from '@error/ErrorCode';

export class AppError extends Error {
  constructor(
    public statusCode: ErrorCode,
    public errorMessage: string,
  ) {
    super(errorMessage);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(ErrorCode.NOT_FOUND, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(ErrorCode.UNAUTHORIZED, message);
  }
}

export class TokenInvalidError extends AppError {
  constructor(message: string) {
    super(ErrorCode.TOKEN_INVALID, message);
  }
}

export class TokenExpiredError extends AppError {
  constructor(message: string) {
    super(ErrorCode.TOKEN_EXPIRED, message);
  }
}

export class MissingTokenError extends AppError {
  constructor(message: string) {
    super(ErrorCode.MISSING_TOKEN, message);
  }
}

export class ProhibitedError extends AppError {
  constructor(message: string) {
    super(ErrorCode.FORBIDDEN, message);
  }
}
