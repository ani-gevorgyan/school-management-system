import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';
import { AUTH_TOKEN_PREFIX } from '../constants';
import { GraphQLError } from 'graphql';

const requireToBeAuthenticated = async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  let token;
  const jwtKey = process.env.JWT_KEY!;

  if (authorization && authorization.startsWith(AUTH_TOKEN_PREFIX)) {
    token = authorization.split(' ')[1];
  }
  if (!token) {
    throw new GraphQLError('Unauthorized request!', {
      extensions: {
        code: 'UNAUTHORIZED',
      },
    });
  }

  try {
    const decoded = jwt.verify(token, jwtKey);

    const decodedData = JSON.stringify(decoded);
    return JSON.parse(decodedData).id;
  } catch (err) {
    throw new UnauthorizedError();
  }
};

export default requireToBeAuthenticated;
