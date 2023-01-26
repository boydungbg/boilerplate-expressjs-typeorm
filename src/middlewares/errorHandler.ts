import { responseError } from '@/utils/Response';
import ExceptionHandler from '@/models/ExceptionHandler';
import { Response, Request, NextFunction } from 'express';

const errorHandler = (
  err: ExceptionHandler,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  responseError({
    res: res,
    status: err.status,
    message: err.message,
    data: err.data
  })
};

export { errorHandler };
