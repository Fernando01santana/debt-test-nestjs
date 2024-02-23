import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'src/shared/utils/utils.module';
import { User } from '../users/entities/user.entity';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

const configService = new ConfigService();

@Module({
  imports: [
    UtilsModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: configService.get('SECRET_TOKEN'),
      signOptions: { expiresIn: configService.get('EXPIRE_TOKEN') },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
