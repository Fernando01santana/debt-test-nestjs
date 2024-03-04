import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { UserNotFoundInSystemException } from 'src/shared/exceptions/user.exception';
import { StringToDate } from 'src/shared/utils/stringToDate';
import { CreateDebitRequesDto } from '../dtos/debits.dto';
import { Debt } from '../entities/debt.entity';
import { IDebtsService } from '../interfaces/debts.interface';
import { DebtRepository } from '../repositories/debts.repository';

export class DebtsService implements IDebtsService {
  constructor(
    @InjectRepository(Debt)
    private readonly debtRepository: DebtRepository,
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
    //? MODIFICACAO FEITA: ADICAO DE UM CONSTRUTOR NA CLASSE DEBT RESULTANDO ASSIM NA POSSIBILIDADE DE PASSAR OBJETO NA INSTANCIA DA CLASSE
    const dateInCorrectFormat = this.stringToDate.convertDate(data.data_expire);
    const createDebt = new Debt({
      data_expire: dateInCorrectFormat,
      document: data.document,
      user: userExists,
      value: data.value,
    });

    await this.debtRepository.save(createDebt);
    return;
  }

  async list(data: string): Promise<Debt[]> {
    return this.debtRepository.findBy({ document: data });
  }
}
