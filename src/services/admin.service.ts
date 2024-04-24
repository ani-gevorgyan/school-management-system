import {
  UserRegistrationData,
  UserRegistrationResponse,
} from '../datatypes/user';
import prisma from '../db/prisma';

class AdminService {
  async createUser(
    data: UserRegistrationData,
  ): Promise<UserRegistrationResponse> {
    return prisma.admin.create({
      data: { email: data.email, password: data.password, role: 'admin' },
    });
  }

  async authenticateUserByEmail(email: string): Promise<any> {
    const user = await prisma.admin.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials!');
    }
    return user;
  }
}

const adminService = new AdminService();
export default adminService;
