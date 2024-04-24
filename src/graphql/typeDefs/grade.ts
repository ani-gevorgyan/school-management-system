export const grade = `#graphql

type Grade {
    grade: String!
    subjectId: String!
    studentId: String!
}


input CreateGradeData {
    grade: String!
    subjectId: String!
    studentId: String!
}

input UpdateGradeData {
    grade: String!
    subjectId: String!
    studentId: String!
}

extend type Query {
    getGradesByStudentId(studentId: String!): [Grade]
    getGradeById(studentId: String!, subjectId: String!): Grade
}

extend type Mutation {
    addGrade(data: CreateGradeData): Grade
    updateGrade(data: UpdateGradeData): Grade
    deleteGrade(studentId: String!, subjectId: String!): Grade
}

`;
