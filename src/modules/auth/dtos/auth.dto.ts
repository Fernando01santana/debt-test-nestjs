import { IsString } from 'class-validator';

export class LoginRequest {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class LoginResponse {
  @IsString()
  token: string;

  @IsString()
  expired_in: string;
}
