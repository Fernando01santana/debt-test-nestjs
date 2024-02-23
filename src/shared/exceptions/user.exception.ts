import { ConflictException, NotFoundException } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
  constructor(message?: string) {
    super(message || 'Usuário já cadastrado.');
  }
}

export class UserNotFoundInSystemException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'Usuario nao encontrado.');
  }
}

export class UserTypeNotExistsException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'Nivel de acesso informado nao existe.');
  }
}
