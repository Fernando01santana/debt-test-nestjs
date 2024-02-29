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
    private readonly debtRepository: DebtRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  private calculateScore(totalDebt: number, debtsCount: number): number {
    if (totalDebt === 0) {
      return 10000;
    }

    const averageDebt = totalDebt / debtsCount;
    return 10000 / Math.sqrt(averageDebt + 100);
  }

  private async getUserWithDebts(document: string): Promise<User> {
    return this.userRepository.findOne({
      where: { document },
      relations: ['debts'],
    });
  }

  async findByCustomer(data: string): Promise<ScoreResponseDto> {
    const user = await this.getUserWithDebts(data);

    if (!user) {
      throw new UserNotFoundInSystemException();
    }

    const debtsCount = user.debts?.length || 0;
    const totalDebt =
      debtsCount > 0
        ? user.debts.reduce((acc, debt) => acc + debt.value, 0)
        : 0;

    const score = this.calculateScore(totalDebt, debtsCount);

    return { score, date: new Date() };
  }
}
