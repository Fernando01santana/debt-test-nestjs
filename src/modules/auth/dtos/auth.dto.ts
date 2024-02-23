import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    example: '00000000000',
    description: 'CPF do usuario',
  })
  @IsString()
  document: string;

  @ApiProperty({
    example: '123123',
    description: 'Senha de acesso do usuario',
  })
  @IsString()
  password: string;
}

export class LoginResponse {
  @ApiProperty({
    example: 'kjhSADUHaskdjhaUHREBFLkjhsdkjahflakjhlakjhgajhsguhglakjshg',
    description: 'Token JWT de validacao de acesso',
  })
  @IsString()
  token: string;

  @ApiProperty({
    example: '23/02/2024 17:34',
    description: 'Hora que o token ira expirar',
  })
  @IsString()
  expired_in: string;
}
