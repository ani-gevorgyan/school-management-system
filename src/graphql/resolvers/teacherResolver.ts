/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  AddTeacherQuery,
  DeleteTeacherData,
  GetTeacherByIdQuery,
  UpdateTeacherQuery,
} from '../../datatypes/teacher';
import teacherService from '../../services/teacher.service';

export default {
  Query: {
    teachers: () => {
      return teacherService.getAllTeachers();
    },
    getTeacherById: (
      parent: any,
      { id }: GetTeacherByIdQuery,
      context: any,
    ) => {
      return teacherService.findTeacherById(id);
    },
  },
  Mutation: {
    addTeacher: (parent: any, { data }: AddTeacherQuery, context: any) => {
      return teacherService.addTeacher(data);
    },
    updateTeacher: (
      parent: any,
      { data }: UpdateTeacherQuery,
      context: any,
    ) => {
      return teacherService.updateTeacher(data.id, data);
    },
    deleteTeacher: (parent: any, id: DeleteTeacherData, context: any) => {
      return teacherService.deleteTeacher(id);
    },
  },
};
