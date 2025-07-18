export enum ErrorCode {
  INTERNAL = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

export const ErrorHttpStatusMap: Record<
  NonNullable<ErrorCode>,
  HttpStatusCode
> = {
  [ErrorCode.INTERNAL]: HttpStatusCode.INTERNAL_SERVER_ERROR,
  [ErrorCode.BAD_REQUEST]: HttpStatusCode.BAD_REQUEST,
  [ErrorCode.UNAUTHORIZED]: HttpStatusCode.UNAUTHORIZED,
  [ErrorCode.FORBIDDEN]: HttpStatusCode.FORBIDDEN,
  [ErrorCode.NOT_FOUND]: HttpStatusCode.NOT_FOUND,
  [ErrorCode.CONFLICT]: HttpStatusCode.CONFLICT,
  [ErrorCode.UNPROCESSABLE_ENTITY]: HttpStatusCode.UNPROCESSABLE_ENTITY,
  [ErrorCode.TOO_MANY_REQUESTS]: HttpStatusCode.TOO_MANY_REQUESTS,
};

export const ErrorMessage = {
  MISSING_TOKEN: 'Missing token',
  INVALID_TOKEN: 'Invalid token',
  INVALID_CREDENTIALS: 'Invalid credentials',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  ACCESS_DENIED: 'Access denied',
  INSUFFICIENT_ROLE: 'Insufficient role',
  MISSING_OR_MALFORMED_TOKEN: 'Missing or malformed token',
};
