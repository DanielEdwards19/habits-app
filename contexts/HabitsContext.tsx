import { Habit } from '@/constants/habits';
import { firestoreService, UserHabit } from '@/services/firestore';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface HabitsContextType {
  userHabits: UserHabit[];
  addHabit: (habit: Habit, duration: number) => Promise<void>;
  removeHabit: (habitId: string) => Promise<void>;
  toggleHabitCompletion: (habitId: string) => Promise<void>;
  isHabitCompleted: (habitId: string) => boolean;
  loading: boolean;
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export const HabitsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userHabits, setUserHabits] = useState<UserHabit[]>([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // Real-time Firestore subscription
  useEffect(() => {
    if (!user) {
      setUserHabits([]);
      setLoading(false);
      return;
    }

    const unsubscribe = firestoreService.subscribeToUserHabits(
      user.uid,
      (habits) => {
        setUserHabits(habits);
        setLoading(false);
      },
      (error) => {
        console.error('Firestore error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const addHabit = useCallback(async (habit: Habit, duration: number) => {
    if (!user) {
      console.error('No user logged in');
      return;
    }

    try {
      await firestoreService.addHabit(user.uid, habit, duration);
    } catch (error) {
      console.error('Error adding habit:', error);
      throw error;
    }
  }, [user]);

  const removeHabit = useCallback(async (habitId: string) => {
    try {
      await firestoreService.removeHabit(habitId);
    } catch (error) {
      console.error('Error removing habit:', error);
      throw error;
    }
  }, []);

  const toggleHabitCompletion = useCallback(async (habitId: string) => {
    const habit = userHabits.find(h => h.id === habitId);
    if (!habit) return;

    const isCompletedToday = habit.completedDates.includes(today);
    const updatedCompletedDates = isCompletedToday
      ? habit.completedDates.filter((date) => date !== today)
      : [...habit.completedDates, today];

    try {
      await firestoreService.toggleHabitCompletion(habitId, updatedCompletedDates);
    } catch (error) {
      console.error('Error toggling habit completion:', error);
      throw error;
    }
  }, [userHabits, today]);

  const isHabitCompleted = useCallback((habitId: string) => {
    const habit = userHabits.find(h => h.id === habitId);
    return habit ? habit.completedDates.includes(today) : false;
  }, [userHabits, today]);

  return (
    <HabitsContext.Provider value={{ userHabits, addHabit, removeHabit, toggleHabitCompletion, isHabitCompleted, loading }}>
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

