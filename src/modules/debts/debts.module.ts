import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerLevelMiddleware } from 'src/shared/middlewares/admin.middleware';
import { UtilsModule } from 'src/shared/utils/utils.module';
import { User } from '../users/entities/user.entity';
import { DebtsController } from './controllers/debts.controller';
import { Debt } from './entities/debt.entity';
import { DebtsService } from './services/debts.service';

@Module({
  imports: [UtilsModule, TypeOrmModule.forFeature([User, Debt])],
  controllers: [DebtsController],
  providers: [DebtsService],
  exports: [DebtsModule],
})
export class DebtsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ManagerLevelMiddleware)
      .forRoutes(
        { path: 'debts', method: RequestMethod.GET },
        { path: 'debts', method: RequestMethod.POST },
      );
  }
}
