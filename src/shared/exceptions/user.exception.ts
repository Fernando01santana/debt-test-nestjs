import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
  constructor(message?: string) {
    super(message || 'Usuário já cadastrado.');
  }
}

export class UserTypeNotExistsException extends ConflictException {
  constructor(message?: string) {
    super(message || 'Nivel de acesso informado nao existe.');
  }
}
