import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Debt } from '../entities/debt.entity';

@Injectable()
export class DebtRepository extends Repository<Debt> {}
