import { Request, Response, NextFunction } from 'express';
import { Users } from '../utils/interfaces';
import { verifyToken } from '../utils/tokens';

const excludedPaths = ['/user/login'];

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    if (excludedPaths.includes(req.path)) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw { status: 401, message: 'Authorization header missing' };
    }

    const token = authHeader.split(' ')[1];
    const decoded = await verifyToken(token);
    if (!decoded) {
      throw { status: 401, message: 'Unauthorized User' };
    }

    req.user = decoded as Users;
    next();
  } catch (error) {
    next(error);
  }
}
