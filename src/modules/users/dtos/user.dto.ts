import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateAndListUserRequest {
  @IsString()
  @ApiProperty({
    example: 'Roberto Santos',
    description: 'Nome do utilizador da conta.',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'teste@teste.com',
    description: 'Email do utilizador da conta.',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: '1k2j3h123',
    description: 'Senha do utilizador da conta.',
  })
  password: string;

  @IsString()
  @ApiProperty({
    example: '15/05/2001',
    description: 'Data de nascimento do utilizador da conta.',
  })
  data_birthday: string;

  @IsString()
  @ApiProperty({
    example: '00000000012',
    description: 'Documento do utilizador da conta',
  })
  document: string;

  @IsString()
  @ApiProperty({
    example: 'Customer ou Admin',
    description: 'Nivel de acesso do utilzador da conta',
  })
  acess_level: string;
}
