export type GradeData = {
  grade: string;
  subjectId: string;
  studentId: string;
};

export type GradeResponse = {
  grade: string;
  subjectId: string;
  studentId: string;
};

export type GetGradesByStudentIdQuery = {
  studentId: string;
};

export type AddGradeQuery = {
  data: GradeData;
};

export type UpdateGradeQuery = {
  data: GradeData;
};

export type DeleteGradeQuery = {
  studentId: string;
  subjectId: string;
};

export type GetGradeByIdQuery = {
  studentId: string;
  subjectId: string;
};
