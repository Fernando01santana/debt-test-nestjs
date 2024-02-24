import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginRequest, LoginResponse } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({
    description: 'Autentica o usuario e retorna o token de acesso',
  })
  @ApiBody({ type: LoginRequest })
  async login(@Body() data: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(data);
  }
}
