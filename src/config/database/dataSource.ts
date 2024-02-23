import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Debt } from 'src/modules/debts/entities/debt.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

config();
const configService = new ConfigService();
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [User, Debt],
  migrations: ['dist/shared/migrations/*.js'],
  synchronize: false,
};

export const dataSourceConfig = new DataSource(dataSourceOptions);
