import { Module } from '@nestjs/common';
import { TypeOrmModule } from './config/database/typeorm.module';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [TypeOrmModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
