class ExceptionHandler extends Error {
  message: string;
  status: number;
  data: Array<any> | Object;
  constructor(status?: number, message?: string, data?: Array<any> | Object) {
    super(message);
    this.status = status || 500;
    this.message = message || 'Something went wrong';
    this.data = data || [];
  }
}

export default ExceptionHandler;