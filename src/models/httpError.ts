export class HttpError extends Error {
  code: number;
  info: any;
  constructor(message: string, errorCode: number, info: any) {
    super(message); //add a message prop to instances
    this.code = errorCode;
    this.info = info;
  }
}
