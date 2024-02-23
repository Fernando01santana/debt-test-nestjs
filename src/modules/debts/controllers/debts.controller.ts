import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateDebitRequesDto } from '../dtos/debits.dto';
import { Debt } from '../entities/debt.entity';
import { DebtsService } from '../services/debts.service';

@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}
  @Post()
  async insertDebt(@Body() data: CreateDebitRequesDto): Promise<void> {
    return await this.debtsService.create(data);
  }
  @Get(':document')
  async find(@Param('document') data: string): Promise<Debt[]> {
    return await this.debtsService.list(data);
  }
}
