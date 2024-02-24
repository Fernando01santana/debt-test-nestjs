import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisApplicationModule } from 'src/config/redis/redis.module';
import { ManagerLevelMiddleware } from 'src/shared/middlewares/admin.middleware';
import { UtilsModule } from 'src/shared/utils/utils.module';
import { ScoreModule } from '../score/score.module';
import { UsersController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UtilsModule,
    ScoreModule,
    RedisApplicationModule,
  ],
  controllers: [UsersController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ManagerLevelMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
