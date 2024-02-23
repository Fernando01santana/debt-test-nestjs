import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    const newUser = new User();
    newUser.document = data.document;
    newUser.name = data.name;
    newUser.data_birthday = formattedDate;
    newUser.password = passwordEncoded;
    newUser.email = data.email;
    newUser.type = typeExists;

    return this.usersRepository.save(newUser);
  }

  async find(): Promise<User[]> {
    return this.usersRepository.find();
  }

  validateLevelAcessEmail(data: string): boolean {
    const regexValidDomain = /^[^\s@]+@br\.experian\.com$/i;
    const emailValid = regexValidDomain.test(data);
    return emailValid;
  }
}
