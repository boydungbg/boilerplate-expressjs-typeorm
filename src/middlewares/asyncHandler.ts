import { NextFunction, Request, Response } from 'express';

const asyncHandler =
  (cb: (req: Request, res: Response, next: NextFunction) => void) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(cb(req, res, next)).catch(next);
  };

export default asyncHandler;
