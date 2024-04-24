/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import studentService from '../../services/student.service';
import {
  AddStudentQuery,
  AssignSubjectQuery,
  DeleteStudentData,
  GetStudentByIdQuery,
  UpdateStudentQuery,
} from '../../datatypes/student';

export default {
  Query: {
    students: () => {
      return studentService.getAllStudents();
    },
    getStudentById: (
      parent: any,
      { id }: GetStudentByIdQuery,
      context: any,
    ) => {
      return studentService.getStudentById(id);
    },
  },
  Mutation: {
    addStudent: (parent: any, { data }: AddStudentQuery, context: any) => {
      return studentService.addStudent(data);
    },
    assignSubject: (
      parent: any,
      { data }: AssignSubjectQuery,
      context: any,
    ) => {
      return studentService.assignSubject(data);
    },
    updateStudent: (
      parent: any,
      { data }: UpdateStudentQuery,
      context: any,
    ) => {
      return studentService.updateStudent(data.id, data);
    },
    deleteStudent: (parent: any, { id }: DeleteStudentData, context: any) => {
      return studentService.deleteStudent(id);
    },
  },
};
