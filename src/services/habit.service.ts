import { ERROR_MESSAGE } from "../constants/error-message.js";
import { STATUS_CODE } from "../constants/status-code.js";
import { addHabitSchema, updateHabitSchema } from "../schema/habit.schema.js";
import { AppError } from "../utils/app-error.js";
import { validateReqBody } from "../middleware/body-validation.middleware.js";

type Habit = {
  id: string;
  name: string;
  description: string;
};

let habitDummyData: Habit[] = [
  {
    id: "1",
    name: "Habit 1",
    description: "Description 1",
  },
  {
    id: "2",
    name: "Habit 2",
    description: "Description 2",
  },
];

export function getAllHabit() {
  return { habits: habitDummyData };
}

export function getHabitById(id: string) {
  const habit = habitDummyData.find((habit) => habit.id === id);
  if (!habit)
    throw new AppError(ERROR_MESSAGE.HABIT_NOT_FOUND, STATUS_CODE.NOT_FOUND);
  return habit;
}

export function addHabit(habit: Habit) {
  habitDummyData.push(habit);
  return habitDummyData;
}

export function updateHabit(id: string, habit: Habit) {
  const habitData = habitDummyData.find((habit) => habit.id === id);
  if (!habitData)
    throw new AppError(ERROR_MESSAGE.HABIT_NOT_FOUND, STATUS_CODE.NOT_FOUND);

  const updatedHabit = { ...habitData, ...habit };
  const newHabitDummyData = habitDummyData.map((habit) =>
    habit.id === id ? updatedHabit : habit
  );
  habitDummyData = newHabitDummyData;
  return newHabitDummyData;
}
