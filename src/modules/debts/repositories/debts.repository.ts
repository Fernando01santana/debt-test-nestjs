import { EntityRepository, Repository } from 'typeorm';
import { Debt } from '../entities/debt.entity';

@EntityRepository(Debt)
export class DebtRepository extends Repository<Debt> {}
