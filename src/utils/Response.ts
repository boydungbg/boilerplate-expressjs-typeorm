import { Response } from 'express';

type ResponseParams = {
  res: Response,
  status?: number,
  data?: Array<any> | Object,
  message?: string
}

const responseSuccess = ({ res, data = {}, message = '', status = 200 }: ResponseParams) => {
  res.status(status).json({
    status: status,
    data: data,
    message: message,
    success: true,
  });
  return;
}
const responseError = ({ res, data = {}, message = '', status = 200 }: ResponseParams) => {
  res.status(status).json({
    status: status,
    data: data,
    message: message,
    success: false,
  });
  return;
}

export {
  responseSuccess,
  responseError
};