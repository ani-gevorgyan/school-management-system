import BadRequestError from '../errors/BadRequestError';
import prisma from '../db/prisma';
import NotFoundError from '../errors/NotFoundError';
import { SubjectData, SubjectResponse } from '../datatypes/subject';

class SubjectService {
  async getAllSubjects(): Promise<SubjectResponse[]> {
    return prisma.subject.findMany({
      include: { students: { include: { student: true } }, grades: true },
    });
  }

  async addSubject(data: SubjectData): Promise<SubjectResponse> {
    const subject = await prisma.subject.findUnique({
      where: { title: data.title },
    });
    if (subject) {
      throw new BadRequestError('Subject with provided title already exist!');
    }
    return prisma.subject.create({
      data: {
        teacherId: data.teacherId as string,
        title: data.title,
        description: data.description,
      },
    });
  }

  async updateSubject(id: string, data: any): Promise<SubjectResponse> {
    await this.getSubjectById(id);
    const existingSubject = await prisma.subject.findUnique({
      where: { title: data.title },
    });
    if (existingSubject && existingSubject.id !== id) {
      throw new BadRequestError('Subject with provided title already exists!');
    }
    return prisma.subject.update({
      where: { id },
      data: {
        teacherId: data.teacherId as string,
        title: data.title,
        description: data.description,
      },
    });
  }

  async getSubjectById(id: string): Promise<SubjectResponse> {
    const subject = await prisma.subject.findUnique({
      where: { id },
      include: { grades: true, students: { include: { student: true } } },
    });
    if (!subject) {
      throw new NotFoundError('Subject does not exist!');
    }
    return subject;
  }

  async deleteSubject(id: string): Promise<string> {
    const subject = await this.getSubjectById(id);
    await prisma.subject.delete({ where: { id } });
    return subject.id;
  }
}

const subjectService = new SubjectService();
export default subjectService;
