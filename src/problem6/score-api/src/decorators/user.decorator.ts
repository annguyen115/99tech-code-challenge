import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ErrorMessage } from '@error/ErrorCode';
import { MissingTokenError } from '@error/AppError';
import { UserPayload } from '@appTypes/user-payload';

export const User = createParamDecorator(
  (field: keyof UserPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request & { user?: any }>();
    const user = request.user as UserPayload;

    if (!user) {
      throw new MissingTokenError(ErrorMessage.MISSING_TOKEN);
    }

    return field ? user?.[field] : user;
  },
);
