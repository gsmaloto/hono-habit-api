export class AppError extends Error {
  constructor(message: string, public http_status: number, public error?: any) {
    super(message);
    this.http_status = http_status;
    this.error = error;
  }
}
