import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { BaseController } from '@modules/base/base.controller';
import { AuthService } from '@modules/auth/auth.service';
import { LoginRequestPayloadDto } from '@modules/auth/dto/login.dto';
import { Auth } from '@decorators/auth.decorator';
import { User } from '@decorators/user.decorator';
import { UserPayload } from '@appTypes/user-payload';
import { RefreshTokenRequestPayloadDto } from '@modules/auth/dto/refresh-token.dto';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  @Post('login')
  login(@Body() dto: LoginRequestPayloadDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  @HttpCode(200)
  @Auth()
  async logout(@User() user: UserPayload) {
    const { id: userId, username } = user;
    await this.authService.logout(userId);
    return this.message(`Logout successful for user ${username}`);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenRequestPayloadDto) {
    const { refreshToken } = dto;
    return this.authService.refreshToken(refreshToken);
  }
}
