import { CreateAndListUserRequest } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

export interface IUserService {
  create(data: CreateAndListUserRequest): Promise<User>;
  find(): Promise<User[]>;
}
