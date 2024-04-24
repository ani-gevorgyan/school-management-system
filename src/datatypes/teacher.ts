export type TeacherData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type UpdateTeacherData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type AddTeacherQuery = {
  data: TeacherData;
};

export type GetTeacherByIdQuery = {
  id: string;
};

export type UpdateTeacherQuery = {
  data: UpdateTeacherData;
};

export type TeacherResponse = {
  email: string;
  firstName: string;
  lastName: string;
};

export type DeleteTeacherData = {
  id: string;
};
