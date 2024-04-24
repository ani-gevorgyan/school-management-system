/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  AddGradeQuery,
  DeleteGradeQuery,
  GetGradeByIdQuery,
  GetGradesByStudentIdQuery,
  UpdateGradeQuery,
} from '../../datatypes/grade';
import gradeService from '../../services/grade.service';

export default {
  Query: {
    getGradesByStudentId: (
      parent: any,
      { studentId }: GetGradesByStudentIdQuery,
      context: any,
    ) => {
      return gradeService.getAllGradesByStudentId(studentId);
    },
    getGradeById: (parent: any, data: GetGradeByIdQuery, context: any) => {
      return gradeService.getGradeById(data.studentId, data.subjectId);
    },
  },
  Mutation: {
    addGrade: (parent: any, { data }: AddGradeQuery, context: any) => {
      return gradeService.addGrade(data);
    },
    updateGrade: (parent: any, { data }: UpdateGradeQuery, context: any) => {
      return gradeService.updateGrade(data);
    },
    deleteGrade: (parent: any, data: DeleteGradeQuery, context: any) => {
      return gradeService.deleteGrade(data.studentId, data.subjectId);
    },
  },
};
