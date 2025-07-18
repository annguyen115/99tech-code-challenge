import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LogModule } from '@modules/log/log.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [UsersModule, LogModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
