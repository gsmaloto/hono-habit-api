import type { Context } from "hono";
import { AppError } from "../utils/app-error.js";
import type { StatusCode } from "hono/utils/http-status";
import { STATUS_CODE } from "../constants/status-code.js";
import { ERROR_MESSAGE } from "../constants/error-message.js";

export default function errorMiddleware(err: Error, c: Context) {
  if (err instanceof AppError) {
    return c.json(
      { ...err, message: err.message },
      err.http_status as StatusCode
    );
  }

  return c.json(
    { message: ERROR_MESSAGE.SERVER_ERROR },
    STATUS_CODE.INTERNAL_SERVER_ERROR
  );
}
