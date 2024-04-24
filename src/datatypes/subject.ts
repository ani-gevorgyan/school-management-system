import { GradeResponse } from './grade';
import { StudentResponse } from './student';

export type SubjectData = {
  title: string;
  description: string;
  teacherId?: string;
};

export type UpdateSubjectData = {
  id: string;
  title: string;
  description: string;
  teacherId?: string;
};

export type SubjectResponse = {
  id: string;
  title: string;
  description: string;
  teacherId: string | null;
  students?: StudentSubject[];
  grades?: GradeResponse[];
};

export type StudentSubject = {
  student: StudentResponse;
};

export type CreateSubjectQuery = {
  data: SubjectData;
};

export type UpdateSubjectQuery = {
  data: UpdateSubjectData;
};

export type DeleteSubjectData = {
  id: string;
};

export type GetSubjectByIdQuery = {
  id: string;
};
