import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import _ from 'lodash';
import base from './graphql/typeDefs/base';
import { BASE_URL } from './constants';
import authRouter from './api/auth';
import requireToBeAuthenticated from './middlewares/requireToBeAuthenticated';
import errorHandler from './errors/errorHandler';
import { teacher } from './graphql/typeDefs/teacher';
import teacherResolver from './graphql/resolvers/teacherResolver';
import { subject } from './graphql/typeDefs/subject';
import subjectResolver from './graphql/resolvers/subjectResolver';
import { student } from './graphql/typeDefs/student';
import studentResolver from './graphql/resolvers/studentResolver';
import { grade } from './graphql/typeDefs/grade';
import { studentsSubjects } from './graphql/typeDefs/studentsSubjects';
import gradeResolver from './graphql/resolvers/gradeResolver';

async function initializeApp(): Promise<Application> {
  const app: Application = express();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(BASE_URL, authRouter);

  const server = new ApolloServer({
    typeDefs: [base, subject, teacher, student, grade, studentsSubjects],
    resolvers: _.merge(
      {},
      teacherResolver,
      subjectResolver,
      studentResolver,
      gradeResolver,
    ),
    formatError: (formattedError, error) => {
      return { ...formattedError };
    },
  });
  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        user: await requireToBeAuthenticated(req, res),
      }),
    }),
  );
  app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to File Managing System!');
  });

  app.all('*', (req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
  });

  app.use(errorHandler);

  return app;
}

export default initializeApp;
