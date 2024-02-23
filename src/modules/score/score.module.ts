import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'src/shared/utils/utils.module';
import { Debt } from '../debts/entities/debt.entity';
import { User } from '../users/entities/user.entity';
import { ScoreController } from './controllers/score.controller';
import { ScoreService } from './services/score.service';

@Module({
  imports: [UtilsModule, TypeOrmModule.forFeature([User, Debt])],
  controllers: [ScoreController],
  providers: [ScoreService],
  exports: [ScodeModule],
})
export class ScodeModule {}
