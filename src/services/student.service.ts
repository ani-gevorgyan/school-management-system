import bcrypt from 'bcrypt';
import BadRequestError from '../errors/BadRequestError';
import prisma from '../db/prisma';
import NotFoundError from '../errors/NotFoundError';
import {
  AssignSubjectData,
  StudentData,
  StudentResponse,
  UpdateStudentData,
} from '../datatypes/student';

class StudentService {
  async getAllStudents(): Promise<StudentResponse[]> {
    return prisma.student.findMany({
      include: { subjects: { include: { subject: true } }, grades: true },
    });
  }

  async addStudent(data: StudentData): Promise<StudentResponse> {
    const existingStudent = await prisma.student.findUnique({
      where: { email: data.email },
    });
    if (existingStudent) {
      throw new BadRequestError('Student with provided email already exists!');
    }
    return prisma.student.create({
      data: {
        password: bcrypt.hashSync(data.password, 10),
        email: data.email,
        lastName: data.lastName,
        firstName: data.firstName,
      },
    });
  }

  async assignSubject(
    data: AssignSubjectData,
  ): Promise<StudentResponse | null> {
    const student = await this.getStudentById(data.studentId);
    const { subjects } = student;
    subjects?.map((item) => {
      if (item.subject.id === data.subjectId) {
        throw new BadRequestError('Student already has the provided subject!');
      }
    });
    if (student)
      await prisma.student.update({
        where: { id: data.studentId },
        data: {
          subjects: { create: { subjectId: data.subjectId } },
        },
      });
    return prisma.student.findUnique({
      where: { id: student.id },
      include: { subjects: { include: { subject: true } } },
    });
  }

  async updateStudent(
    id: string,
    data: UpdateStudentData,
  ): Promise<StudentResponse> {
    const student = await this.getStudentById(id);
    const studentByEmail = await prisma.student.findUnique({
      where: { email: data.email },
    });
    if (studentByEmail && studentByEmail.id !== student.id) {
      throw new BadRequestError('Student with provided email already exists!');
    }
    return prisma.student.update({
      where: { id: student.id },
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: bcrypt.hashSync(data.password, 10),
      },
    });
  }

  async getStudentById(id: string): Promise<StudentResponse> {
    const student = await prisma.student.findUnique({
      where: { id },
      include: { subjects: { include: { subject: true } } },
    });
    if (!student) {
      throw new NotFoundError('Student with provided id does not exist!');
    }
    return student;
  }

  async deleteStudent(id: string): Promise<string> {
    const student = await this.getStudentById(id);
    await prisma.student.delete({ where: { id } });
    return student.id;
  }
}

const studentService = new StudentService();
export default studentService;
