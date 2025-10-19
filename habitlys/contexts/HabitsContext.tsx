import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Habit } from '@/constants/habits';

export interface UserHabit extends Habit {
  duration: number; // Duration in minutes
  addedDate: string; // Date when the habit was added
  completedDates: string[]; // Dates when the habit was completed
}

interface HabitsContextType {
  userHabits: UserHabit[];
  addHabit: (habit: Habit, duration: number) => void;
  removeHabit: (habitId: string) => void;
  toggleHabitCompletion: (habitId: string) => void;
  isHabitCompleted: (habitId: string) => boolean;
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export const HabitsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userHabits, setUserHabits] = useState<UserHabit[]>([]);
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const addHabit = useCallback((habit: Habit, duration: number) => {
    setUserHabits((prevHabits) => {
      // Check if habit already exists to prevent duplicates
      if (prevHabits.some((h) => h.id === habit.id)) {
        return prevHabits;
      }
      const newUserHabit: UserHabit = {
        ...habit,
        duration,
        addedDate: today,
        completedDates: [],
      };
      return [...prevHabits, newUserHabit];
    });
  }, [today]);

  const removeHabit = useCallback((habitId: string) => {
    setUserHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== habitId));
  }, []);

  const toggleHabitCompletion = useCallback((habitId: string) => {
    setUserHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === habitId) {
          const isCompletedToday = habit.completedDates.includes(today);
          return {
            ...habit,
            completedDates: isCompletedToday
              ? habit.completedDates.filter((date) => date !== today)
              : [...habit.completedDates, today],
          };
        }
        return habit;
      })
    );
  }, [today]);

  const isHabitCompleted = useCallback((habitId: string) => {
    const habit = userHabits.find(h => h.id === habitId);
    return habit ? habit.completedDates.includes(today) : false;
  }, [userHabits, today]);

  return (
    <HabitsContext.Provider value={{ userHabits, addHabit, removeHabit, toggleHabitCompletion, isHabitCompleted }}>
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabitsContext = () => {
  const context = useContext(HabitsContext);
  if (context === undefined) {
    throw new Error('useHabitsContext must be used within a HabitsProvider');
  }
  return context;
};

