export const student = `#graphql

type Student {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    subjectId: String
    grades: [Grade]
    subjects: [StudentsSubjects]
}

input CreateStudentData {
    email: String!
    firstName: String!
    lastName: String!
    password: String!
}

input UpdateStudentData {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    password: String!
}

input AssignSubjectData {
    studentId: String!
    subjectId: String!
}

extend type Query {
    students: [Student]
    getStudentById(id: String!): Student
}

extend type Mutation {
    addStudent(data: CreateStudentData): Student
    assignSubject(data: AssignSubjectData): Student
    updateStudent(data: UpdateStudentData): Student
    deleteStudent(id: String!): String
}

`;
