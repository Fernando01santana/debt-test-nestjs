import { BadRequestException } from '@nestjs/common';

export class AuthCredentialsInvalid extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Credenciais informada invalidas');
  }
}
