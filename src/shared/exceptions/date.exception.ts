import { BadRequestException } from '@nestjs/common';

export class UserDateFormatsException extends BadRequestException {
  constructor(message?: string) {
    super(
      message ||
        'Formato de string de data inválido. Use o formato dd/mm/aaaa.',
    );
  }
}
