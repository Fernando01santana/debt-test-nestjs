import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  CreateDebitRequesDto,
  FindDebitByDocumentDto,
} from '../dtos/debits.dto';
import { Debt } from '../entities/debt.entity';
import { DebtsService } from '../services/debts.service';

@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}
  @Post()
  async insertDebt(@Body() data: CreateDebitRequesDto): Promise<void> {
    return await this.debtsService.create(data);
  }
  @Get()
  async find(@Body() data: FindDebitByDocumentDto): Promise<Debt[]> {
    return await this.debtsService.list(data);
  }
}
