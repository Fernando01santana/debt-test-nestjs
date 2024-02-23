import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequest, LoginResponse } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() data: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(data);
  }
}
