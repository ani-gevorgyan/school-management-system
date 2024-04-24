import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import adminService from './admin.service';
import {
  UserLoginData,
  UserRegistrationData,
  UserRegistrationResponse,
} from '../datatypes/user';
import BadRequestError from '../errors/BadRequestError';
import UnauthorizedError from '../errors/UnauthorizedError';

class AuthService {
  async signup(data: UserRegistrationData): Promise<UserRegistrationResponse> {
    if (data.password !== data.confirmPassword) {
      throw new BadRequestError('Confirm password and password do not match!');
    }
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    data = { ...data, password: hashedPassword };

    return adminService.createUser(data);
  }

  async login(data: UserLoginData): Promise<string> {
    const user = await adminService.authenticateUserByEmail(data.email);

    if (!(await this.isPasswordMatching(data.password, user.password))) {
      throw new UnauthorizedError('Invalid email or password!');
    }

    return this.generateJwtToken(user.id);
  }

  generateJwtToken(id: number): string {
    const jwtKey = process.env.JWT_KEY!;
    return jwt.sign({ id }, jwtKey, { expiresIn: '7d' });
  }

  async isPasswordMatching(
    enteredPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, hashedPassword);
  }
}

const authService = new AuthService();
export default authService;
