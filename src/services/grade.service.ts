import BadRequestError from '../errors/BadRequestError';
import prisma from '../db/prisma';
import studentService from './student.service';
import { GradeData, GradeResponse } from 'src/datatypes/grade';
import subjectService from './subject.service';

class GradeService {
  async getAllGradesByStudentId(studentId: string): Promise<GradeResponse[]> {
    await studentService.getStudentById(studentId);
    return prisma.grade.findMany({ where: { studentId } });
  }

  async validateGradeData(data: GradeData): Promise<void> {
    await studentService.getStudentById(data.studentId);
    await subjectService.getSubjectById(data.subjectId);
    const grade = await this.getGradeById(data.studentId, data.subjectId);
    if (grade) {
      throw new BadRequestError(
        'Grade already exists for provided student and subject!',
      );
    }
  }

  async addGrade(data: GradeData): Promise<GradeResponse> {
    await this.validateGradeData(data);
    return prisma.grade.create({ data });
  }

  async updateGrade(data: GradeData): Promise<GradeResponse> {
    await this.validateGradeData(data);
    return prisma.grade.update({
      where: {
        gradeId: {
          studentId: data.studentId,
          subjectId: data.subjectId,
        },
      },
      data,
    });
  }

  async getGradeById(
    studentId: string,
    subjectId: string,
  ): Promise<GradeResponse | null> {
    const grade = await prisma.grade.findUnique({
      where: {
        gradeId: {
          studentId: studentId,
          subjectId: subjectId,
        },
      },
    });
    return grade;
  }

  async deleteGrade(
    studentId: string,
    subjectId: string,
  ): Promise<GradeResponse> {
    await this.getGradeById(studentId, subjectId);
    return prisma.grade.delete({
      where: {
        gradeId: {
          studentId: studentId,
          subjectId: subjectId,
        },
      },
    });
  }
}

const gradeService = new GradeService();
export default gradeService;
