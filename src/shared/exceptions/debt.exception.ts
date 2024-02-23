import { NotFoundException } from '@nestjs/common';

export class DebtNotFoundToCustomer extends NotFoundException {
  constructor(message?: string) {
    super(message || 'Nenhum');
  }
}
