import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'src/shared/utils/utils.module';
import { Debt } from '../debts/entities/debt.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [UtilsModule, TypeOrmModule.forFeature([User, Debt])],
  controllers: [],
  providers: [],
  exports: [ScodeModule],
})
export class ScodeModule {}
