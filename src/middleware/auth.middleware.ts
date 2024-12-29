import { STATUS_CODE } from "../constants/status-code.js";
import { ERROR_MESSAGE } from "../constants/error-message.js";
import { AppError } from "../utils/app-error.js";
import { createMiddleware } from "hono/factory";

const authMiddleware = createMiddleware(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    throw new AppError(
      ERROR_MESSAGE.INVALID_CREDENTIALS,
      STATUS_CODE.UNAUTHORIZED
    );
  }

  // Basic auth format: "Basic base64(username:password)"
  const [scheme, credentials] = authHeader.split(" ");
  if (scheme !== "Basic") {
    throw new AppError(
      ERROR_MESSAGE.INVALID_CREDENTIALS,
      STATUS_CODE.UNAUTHORIZED
    );
  }

  const decodedCredentials = atob(credentials);
  const [username, password] = decodedCredentials.split(":");

  if (username !== "admin" || password !== "admin123") {
    throw new AppError(
      ERROR_MESSAGE.INVALID_CREDENTIALS,
      STATUS_CODE.UNAUTHORIZED
    );
  }

  await next();
});

export default authMiddleware;
