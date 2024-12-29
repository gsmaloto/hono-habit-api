import { z } from "zod";

export const addHabitSchema = z
  .object({
    id: z.string().min(1, { message: "Id is required" }),
    name: z.string().min(3),
    description: z.string().min(3),
  })
  .strict();

export const updateHabitSchema = addHabitSchema
  .omit({ id: true }) // removed field from addHabitSchema
  .strict()
  .partial();
