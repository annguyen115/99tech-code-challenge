import { Body, Controller, Post } from '@nestjs/common';
import { BaseController } from '@modules/base/base.controller';
import { AuthService } from '@modules/auth/auth.service';
import { LoginRequestPayloadDto } from '@modules/auth/dto/login.dto';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  @Post('login')
  login(@Body() dto: LoginRequestPayloadDto) {
    return this.authService.login(dto);
  }
}
