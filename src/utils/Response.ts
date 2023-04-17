import StatusCode from '@/utils/StatusCode';
import { Response } from 'express';

type ResponseParams = {
  res: Response;
  status?: number;
  data?: Array<any> | Object;
  message?: string;
};

const responseSuccess = ({
  res,
  data = {},
  message = 'Thành công.',
  status = StatusCode.CODE_SUCCESS
}: ResponseParams) => {
  res.status(status).json({
    status: status,
    data: data,
    message: message,
    success: true
  });
  return;
};
const responseError = ({
  res,
  data = {},
  message = 'Thất bại',
  status = StatusCode.CODE_SERVER_ERROR
}: ResponseParams) => {
  res.status(status).json({
    status: status,
    data: data,
    message: message,
    success: false
  });
  return;
};

export { responseSuccess, responseError };
