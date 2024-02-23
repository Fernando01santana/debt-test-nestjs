import {
  CreateDebitRequesDto,
  FindDebitByDocumentDto,
} from '../dtos/debits.dto';
import { Debt } from '../entities/debt.entity';

export interface IDebtsService {
  create(data: CreateDebitRequesDto): Promise<void>;
  list(data: FindDebitByDocumentDto): Promise<Debt[]>;
}
