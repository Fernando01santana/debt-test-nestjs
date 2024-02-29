import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import RedisOtherService from 'src/config/redis/redis.service';
import {
  LevelAcessEmailException,
  UserAlreadyExistsException,
  UserTypeNotExistsException,
} from 'src/shared/exceptions/user.exception';
import { EncriptPassword } from 'src/shared/utils/encriptPassword';
import { ItemExistsInEnum } from 'src/shared/utils/searchEnum';
import { StringToDate } from 'src/shared/utils/stringToDate';
import { CreateAndListUserRequest } from '../dtos/user.dto';
import { LevelAcess, User } from '../entities/user.entity';
import { IUserService } from '../interfaces/service.interface';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: UserRepository,
    private readonly validateEnumValue: ItemExistsInEnum,
    private readonly criptoPass: EncriptPassword,
    private readonly stringTodate: StringToDate,
    private readonly redisService: RedisOtherService,
  ) {}
  async create(data: CreateAndListUserRequest): Promise<User> {
    const existingUser = await this.usersRepository.findBy({
      document: data.document,
    });
    if (existingUser.length > 0) {
      throw new UserAlreadyExistsException();
    }
    if (
      !this.validateLevelAcessEmail(data.email) &&
      data.acess_level === LevelAcess.ADMIN
    ) {
      throw new LevelAcessEmailException();
    }
    const passwordEncoded = await this.criptoPass.hashPassword(data.password);
    const formattedDate = this.stringTodate.convertDate(data.data_birthday);
    const typeExists = this.validateEnumValue.search(
      data.acess_level,
      LevelAcess,
    );

    if (!typeExists) {
      throw new UserTypeNotExistsException();
    }

    //? MODIFICACAO FEITA: ADICAO DE UM CONSTRUTOR NA CLASSE DEBT RESULTANDO ASSIM NA POSSIBILIDADE DE PASSAR OBJETO NA INSTANCIA DA CLASSE
    const newUser = new User({
      document: data.document,
      name: data.name,
      email: data.email,
      password: passwordEncoded,
      type: typeExists,
      data_birthday: formattedDate,
    });

    const userCread = await this.usersRepository.save(newUser);
    await this.redisService.createKey(userCread);
    return userCread;
  }

  async find(): Promise<User[]> {
    const dataCache = await this.redisService.getAllCustomers();
    const parsedData = JSON.parse(dataCache.join(''));
    return parsedData;
  }

  validateLevelAcessEmail(data: string): boolean {
    const regexValidDomain = /^[^\s@]+@br\.experian\.com$/i;
    const emailValid = regexValidDomain.test(data);
    return emailValid;
  }
}
