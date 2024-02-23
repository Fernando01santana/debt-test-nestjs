import { LoginRequest, LoginResponse } from '../dtos/auth.dto';

export interface IAuthService {
  login(LoginRequest: LoginRequest): Promise<LoginResponse>;
}
