import { Injectable } from '@nestjs/common';
import { UserRepository } from '@modules/users/user.repository';
import { LogService } from '@modules/log/log.service';
import { UserModel } from '@modules/users/users.schema';
import { isEmpty } from 'lodash';
import { TokenInvalidError, UnauthorizedError } from '@error/AppError';
import { ErrorMessage } from '@error/ErrorCode';
import {
  comparePassword,
  JwtExpiresIn,
  signToken,
  verifyToken,
} from '@utils/auth';
import { UserPayload } from '@appTypes/user-payload';
import { appConfig } from '@config';
import { LoginRequestPayloadDto } from '@modules/auth/dto/login.dto';
import { RefreshTokenResponsePayloadDto } from '@modules/auth/dto/refresh-token.dto';
import { catchVerifyTokenError } from '@error/ErrorHandler';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logService: LogService,
  ) {}

  async login(dto: LoginRequestPayloadDto) {
    const { username, password } = dto;

    // validate user from database
    this.logService.log(
      `Login with username: ${username}`,
      'AuthService -> login',
    );
    const user = await this.validateUser(username, password);

    // generate accessToken & refreshToken
    const [accessToken, refreshToken] = await this.generateToken(
      user.id as string,
      user.username,
      user.fullName,
    );

    this.logService.log(
      `Login successful with username: ${accessToken}, email: ${refreshToken}`,
      'AuthService -> login',
    );

    return { accessToken, refreshToken };
  }

  async logout(userId: string) {
    return this.userRepository.removeRefreshTokenById(userId);
  }

  async refreshToken(token: string): Promise<RefreshTokenResponsePayloadDto> {
    const user = await this.userRepository.findByRefreshToken(token);

    if (isEmpty(user)) {
      throw new TokenInvalidError(ErrorMessage.TOKEN_INVALID);
    }

    try {
      const userPayload = verifyToken(token);
      const newAccessToken = signToken(
        userPayload as UserPayload,
        appConfig.auth.accessTokenExpire as JwtExpiresIn,
      );
      return { accessToken: newAccessToken } as RefreshTokenResponsePayloadDto;
    } catch (e) {
      catchVerifyTokenError(e);
    }
  }

  private async validateUser(
    username: string,
    password: string,
  ): Promise<UserModel> {
    const user = await this.userRepository.findByUsername(username);

    if (isEmpty(user)) {
      throw new UnauthorizedError(ErrorMessage.INVALID_USERNAME_OR_PASSWORD);
    }

    const passwordsMatch = await comparePassword(password, user.password);

    if (!passwordsMatch) {
      throw new UnauthorizedError(ErrorMessage.INVALID_USERNAME_OR_PASSWORD);
    }

    return user.toJSON() as UserModel;
  }

  private async generateToken(
    id: string,
    username: string,
    fullName: string,
  ): Promise<[string, string]> {
    const tokenPayload: UserPayload = {
      id: id,
      username: username,
      fullName: fullName,
    };

    const accessToken = signToken(
      tokenPayload,
      appConfig.auth.accessTokenExpire as JwtExpiresIn,
    );
    const refreshToken = signToken(
      tokenPayload,
      appConfig.auth.refreshTokenExpire as JwtExpiresIn,
    );

    await this.userRepository.updateRefreshToken(id, refreshToken);

    return [accessToken, refreshToken];
  }
}
