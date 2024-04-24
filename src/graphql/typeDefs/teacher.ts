export const teacher = `#graphql

type Teacher {
    id: ID
    email: String
    firstName: String
    lastName: String
    subjects: [Subject]
}

input CreateTeacherData {
    email: String
    firstName: String
    lastName: String
    password: String
}

input UpdateTeacherData {
    id: ID
    email: String
    firstName: String
    lastName: String
    password: String
}
  
extend type Query {
    teachers: [Teacher]
    getTeacherById(id: String!): Teacher
}

extend type Mutation {
    addTeacher(data: CreateTeacherData!): Teacher
    updateTeacher(data: UpdateTeacherData!): Teacher
    deleteTeacher(id: String!): String
}

`;
