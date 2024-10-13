import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('err: ', err);
  const statusCode = res.statusCode !== 200 ? res.statusCode : err?.statusCode || 500;

  res.status(statusCode).json({
    status: false,
    message: err.message,
  });

};
