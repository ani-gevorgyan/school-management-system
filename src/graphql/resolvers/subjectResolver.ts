/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import subjectService from '../../services/subject.service';
import {
  CreateSubjectQuery,
  DeleteSubjectData,
  GetSubjectByIdQuery,
  UpdateSubjectQuery,
} from '../../datatypes/subject';

export default {
  Query: {
    subjects: () => {
      return subjectService.getAllSubjects();
    },
    getSubjectById: (
      parent: any,
      { id }: GetSubjectByIdQuery,
      context: any,
    ) => {
      return subjectService.getSubjectById(id);
    },
  },
  Mutation: {
    addSubject: (parent: any, { data }: CreateSubjectQuery, context: any) => {
      return subjectService.addSubject(data);
    },
    updateSubject: (
      parent: any,
      { data }: UpdateSubjectQuery,
      context: any,
    ) => {
      return subjectService.updateSubject(data.id, data);
    },
    deleteSubject: (parent: any, { id }: DeleteSubjectData, context: any) => {
      return subjectService.deleteSubject(id);
    },
  },
};
