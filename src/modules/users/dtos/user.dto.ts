import { IsEmail, IsString } from 'class-validator';

export class CreateAndListUserRequest {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  data_birthday: string;

  @IsString()
  document: string;

  @IsString()
  acess_level: string;
}
