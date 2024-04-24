import { GradeResponse } from './grade';
import { SubjectResponse } from './subject';

export type StudentData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  subjectId?: string;
};

export type AddStudentQuery = {
  data: StudentData;
};

export type AssignSubjectQuery = {
  data: AssignSubjectData;
};

export type AssignSubjectData = {
  studentId: string;
  subjectId: string;
};

export type UpdateStudentData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type UpdateStudentQuery = {
  data: UpdateStudentData;
};

export type DeleteStudentData = {
  id: string;
};

export type GetStudentByIdQuery = {
  id: string;
};

export type StudentResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  subjectId?: string;
  grades?: GradeResponse[];
  subjects?: StudentSubject[];
};

export type StudentSubject = {
  subject: SubjectResponse;
};
