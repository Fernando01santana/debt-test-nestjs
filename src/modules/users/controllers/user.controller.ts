import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAndListUserRequest } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiOperation({
    description: 'Salva um novo usuario na base de dados.',
  })
  @ApiBody({ type: CreateAndListUserRequest })
  async create(@Body() data: CreateAndListUserRequest): Promise<User> {
    return this.usersService.create(data);
  }

  @Get()
  @ApiOperation({
    description: 'Retorna todos os usuarios da base de dados.',
  })
  async find(): Promise<User[]> {
    return await this.usersService.find();
  }
}
