import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import RedisOtherService from './redis.service';

const configService = new ConfigService();
@Module({
  imports: [
    ConfigModule,
    RedisModule.forRootAsync({
      useFactory: async (): Promise<RedisModuleOptions> => ({
        type: 'single',
        options: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          username: configService.get<string>('REDIS_USERNAME'),
          password: configService.get<string>('REDIS_PASSWORD'),
        },
      }),
    }),
  ],
  providers: [RedisOtherService],
  exports: [RedisOtherService],
})
export class RedisApplicationModule {}
