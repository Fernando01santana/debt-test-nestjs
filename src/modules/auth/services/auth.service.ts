import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { AuthCredentialsInvalid } from 'src/shared/exceptions/auth.exception';
import { TimeAdder } from 'src/shared/utils/addTimeToTIme';
import { EncriptPassword } from 'src/shared/utils/encriptPassword';
import { LoginRequest, LoginResponse } from '../dtos/auth.dto';
import { IAuthService } from '../interfaces/service.interface';

export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly decriptPassword: EncriptPassword,
    private readonly timeAdder: TimeAdder,
    private readonly jwtService: JwtService,
  ) {}
  async login(data: LoginRequest): Promise<LoginResponse> {
    const userExists = await this.userRepository.findOne({
      where: { document: data.document },
    });
    if (!userExists) {
      throw new AuthCredentialsInvalid();
    }

    const passwordVerify = await this.decriptPassword.comparePasswords(
      data.password,
      userExists.password,
    );

    if (passwordVerify == false) {
      throw new AuthCredentialsInvalid();
    }

    return {
      token: this.jwtService.sign({
        email: data.document,
        access_level: userExists.type,
      }),
      expired_in: this.timeAdder.addTimeToCurrentDate(),
    };
  }
}
