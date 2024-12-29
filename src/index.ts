import { serve } from "@hono/node-server";
import { Hono } from "hono";
import habitRoutes from "./routes/habit-routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = new Hono();

app.onError(errorMiddleware);

app.get("/healthcheck", (c) => {
  return c.text("OK");
});

app.route("/habit", habitRoutes);
const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
