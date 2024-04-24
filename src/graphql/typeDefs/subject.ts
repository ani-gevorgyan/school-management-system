export const subject = `#graphql

type Subject {
    id: ID!
    title: String!
    description: String!
    teacherId: String
    students: [StudentsSubjects]
    grades: [Grade]
}

input CreateSubjectData {
    title: String!
    description: String!
    teacherId: String
}

input UpdateSubjectData {
    id: ID!
    title: String!
    description: String!
    teacherId: String
}

extend type Query {
    subjects: [Subject]
    getSubjectById(id: String!): Subject
}

extend type Mutation {
    addSubject(data: CreateSubjectData): Subject
    updateSubject(data: UpdateSubjectData): Subject
    deleteSubject(id: String!): String
}

`;
