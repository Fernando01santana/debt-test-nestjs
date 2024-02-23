import { Module } from '@nestjs/common';
import { TypeOrmModule } from './config/database/typeorm.module';
import { AuthModule } from './modules/auth/auth.module';
import { DebtsModule } from './modules/debts/debts.module';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [TypeOrmModule, UserModule, AuthModule, DebtsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
