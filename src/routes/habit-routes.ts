import { Hono, type Context } from "hono";
import {
  addHabit,
  getAllHabit,
  getHabitById,
  updateHabit,
} from "../services/habit.service.js";
import { validateReqBody } from "../middleware/body-validation.middleware.js";
import { addHabitSchema, updateHabitSchema } from "../schema/habit.schema.js";
import { STATUS_CODE } from "../constants/status-code.js";
import authMiddleware from "../middleware/auth.middleware.js";

const app = new Hono()
  // Apply auth middleware to all routes
  .use("/*", authMiddleware)
  .get("/", (c) => {
    const allHabits = getAllHabit();
    return c.json(allHabits, STATUS_CODE.OK);
  })
  .get("/:id", (c) => {
    const habit = getHabitById(c.req.param("id"));
    return c.json(habit, STATUS_CODE.OK);
  })
  .post("/", validateReqBody(addHabitSchema), async (c: Context) => {
    const validatedReqBody = c.get("validatedReqBody");
    const habit = await addHabit(validatedReqBody);
    return c.json(habit, STATUS_CODE.CREATED);
  })
  .patch("/:id", validateReqBody(updateHabitSchema), async (c: Context) => {
    const id = c.req.param("id");
    const validatedReqBody = c.get("validatedReqBody");
    const updatedHabit = await updateHabit(id, validatedReqBody);
    return c.json(updatedHabit, STATUS_CODE.OK);
  });

export default app;
