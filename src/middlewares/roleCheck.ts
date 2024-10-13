import { Request, Response, NextFunction } from 'express';
import { Users } from '../utils/interfaces';
import { verifyToken } from '../utils/tokens';

export function checkRole(allowedRoles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw {status:401, message: 'Authorization header missing' }
      }
      const token = authHeader.split(' ')[1];
      const decoded = await verifyToken(token)
      if (!allowedRoles.includes(decoded.role)) {
        throw {status:403, message: 'Access denied: Insufficient permissions' }
      }
      req.user = decoded as Users;
      next();
    } catch (error) {
      next(error)
    }
  };
}
