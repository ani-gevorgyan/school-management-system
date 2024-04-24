import bcrypt from 'bcrypt';
import BadRequestError from '../errors/BadRequestError';
import {
  DeleteTeacherData,
  TeacherData,
  TeacherResponse,
  UpdateTeacherData,
} from '../datatypes/teacher';
import prisma from '../db/prisma';
import NotFoundError from '../errors/NotFoundError';

class TeacherService {
  async addTeacher(data: TeacherData): Promise<TeacherResponse> {
    const existingTeacher = await prisma.teacher.findUnique({
      where: { email: data.email },
    });
    if (existingTeacher) {
      throw new BadRequestError('User with provided email already exists!');
    }
    return prisma.teacher.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: bcrypt.hashSync(data.password, 10),
        role: 'teacher',
      },
    });
  }

  async getAllTeachers(): Promise<TeacherResponse[]> {
    return prisma.teacher.findMany({ include: { subjects: true } });
  }

  async findTeacherById(id: string): Promise<TeacherResponse> {
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        subjects: { include: { students: { include: { student: true } } } },
      },
    });
    if (!teacher) {
      throw new NotFoundError('Teacher with provided id does not exist!');
    }
    return teacher;
  }

  async updateTeacher(
    id: string,
    data: UpdateTeacherData,
  ): Promise<TeacherResponse> {
    const teacher = await prisma.teacher.findUnique({ where: { id } });
    if (!teacher) {
      throw new NotFoundError('Teacher with provided id does not exist!');
    }
    return prisma.teacher.update({
      where: { id },
      data: {
        ...data,
        password: bcrypt.hashSync(data.password, 10),
        role: 'teacher',
      },
    });
  }

  async deleteTeacher(data: DeleteTeacherData): Promise<string> {
    const teacher = await prisma.teacher.findUnique({ where: { id: data.id } });
    if (!teacher) {
      throw new NotFoundError('Teacher with provided id does not exist!');
    }
    await prisma.teacher.delete({ where: { id: data.id } });
    return teacher.id;
  }
}

const teacherService = new TeacherService();
export default teacherService;
