import { Response, Request, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(res);
  res.render(err.message);
};

export default errorHandler;
