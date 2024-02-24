import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDebitRequesDto } from '../dtos/debits.dto';
import { Debt } from '../entities/debt.entity';
import { DebtsService } from '../services/debts.service';

@Controller('debts')
@ApiTags('Debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}
  @Post()
  @ApiOperation({
    description:
      'Cria um debito ou seja, cria um registro de uma pendencia financeira.',
  })
  @ApiBody({ type: CreateDebitRequesDto })
  async insertDebt(@Body() data: CreateDebitRequesDto): Promise<void> {
    return await this.debtsService.create(data);
  }
  @Get(':document')
  @ApiOperation({
    description: 'Busca todas as  dividas com base no documento informado.',
  })
  @ApiBody({ type: 'string' })
  async find(@Param('document') data: string): Promise<Debt[]> {
    return await this.debtsService.list(data);
  }
}
