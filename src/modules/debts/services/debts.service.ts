import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { UserNotFoundInSystemException } from 'src/shared/exceptions/user.exception';
import { StringToDate } from 'src/shared/utils/stringToDate';
import {
  CreateDebitRequesDto,
  FindDebitByDocumentDto,
} from '../dtos/debits.dto';
import { Debt } from '../entities/debt.entity';
import { IDebtsService } from '../interfaces/debts.interface';
import { DebtRepository } from '../repositories/debts.repository';

export class DebtsService implements IDebtsService {
  constructor(
    @InjectRepository(Debt)
    private readonly debitRepository: DebtRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly stringToDate: StringToDate,
  ) {}
  async create(data: CreateDebitRequesDto): Promise<void> {
    const userExists = await this.userRepository.findOne({
      where: { document: data.document },
    });

    if (!userExists) {
      throw new UserNotFoundInSystemException();
    }

    const dateInCorretFormat = this.stringToDate.convertDate(data.data_expire);
    const createDebt = new Debt();
    (createDebt.data_expire = dateInCorretFormat),
      (createDebt.document = data.document),
      (createDebt.user = userExists);

    await this.debitRepository.save(createDebt);
    return;
  }

  async list(data: FindDebitByDocumentDto): Promise<Debt[]> {
    return this.debitRepository.findBy({ document: data.document });
  }
}
