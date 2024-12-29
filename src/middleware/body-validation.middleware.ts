import { type MiddlewareHandler } from "hono";
import { ZodSchema } from "zod";
import { AppError } from "../utils/app-error.js";
import { ERROR_MESSAGE } from "../constants/error-message.js";
import { STATUS_CODE } from "../constants/status-code.js";

export const validateReqBody =
  <T extends ZodSchema>(schema: T): MiddlewareHandler =>
  async (c, next) => {
    const reqBody = await c.req.json(); // Parse the request body
    console.log(reqBody);
    const validate = schema.safeParse(reqBody);
    console.log(validate);
    if (!validate.success) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_REQUEST_BODY,
        STATUS_CODE.BAD_REQUEST,
        validate.error
      );
    }
    c.set("validatedReqBody", reqBody);
    await next(); // Proceed to the next middleware or route handler
  };
