import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenRequestPayloadDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class RefreshTokenResponsePayloadDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
