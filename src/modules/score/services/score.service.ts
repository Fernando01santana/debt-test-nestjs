import { InjectRepository } from '@nestjs/typeorm';
import { Debt } from 'src/modules/debts/entities/debt.entity';
import { DebtRepository } from 'src/modules/debts/repositories/debts.repository';
import { User } from 'src/modules/users/entities/user.entity';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { UserNotFoundInSystemException } from 'src/shared/exceptions/user.exception';
import { ScoreResponseDto } from '../dtos/score.dto';
import { IScoreService } from '../interfaces/score.service.dto';

export class ScoreService implements IScoreService {
  constructor(
    @InjectRepository(Debt)
    private readonly debitRepository: DebtRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}
  async findByCustomer(data: string): Promise<ScoreResponseDto> {
    const user = await this.userRepository.findOne({
      where: { document: data },
      relations: ['debts'],
    });

    if (!user) {
      throw new UserNotFoundInSystemException();
    }

    if (!user.debts || user.debts.length === 0) {
      return { score: 1000, date: new Date() };
    }

    //TODO: REMOVER TRECHO POIS NAO HA NECESSIDADE DE VALIDAR SE O DEBITO FOR 0 POIS ENTENDE-SE QUE SENDO 0 O DEBITO NAO EXISTE
    const totalDebt = user.debts.reduce((acc, debt) => acc + debt.value, 0);
    if (totalDebt === 0) {
      return { score: 10000, date: new Date() };
    }

    const averageDebt = totalDebt / user.debts.length;
    const score = 10000 / Math.sqrt(averageDebt + 100);

    return { score, date: new Date() };
  }
}
