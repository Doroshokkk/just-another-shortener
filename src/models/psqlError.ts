export class PsqlError extends Error {
    info: any;
    constructor(message: string, info: any) {
      super(message);
      this.info = info;
    }
  }
  