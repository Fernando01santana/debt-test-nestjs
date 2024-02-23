import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAndListUserRequest } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async create(@Body() data: CreateAndListUserRequest): Promise<User> {
    return this.usersService.create(data);
  }

  @Get()
  async find(): Promise<User[]> {
    return await this.usersService.find();
  }
}
