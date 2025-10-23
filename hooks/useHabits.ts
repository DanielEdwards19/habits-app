import { useMemo } from "react";
import { HABITS, Habit, CategoryId } from "@/constants/habits";

export function useHabits(categoryId: CategoryId) {
  return useMemo(
    () => HABITS.filter((habit) => habit.category === categoryId),
    [categoryId]
  );
}