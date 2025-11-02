import { Habit } from '@/constants/habits';
import { db } from '@/lib/firebase';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface UserHabit extends Habit {
  id: string;
  duration: number;
  addedDate: string;
  completedDates: string[];
  userId: string;
  createdAt?: FirebaseFirestoreTypes.Timestamp;
  lastUpdated?: FirebaseFirestoreTypes.Timestamp;
}

const HABITS_COLLECTION = 'habits';

export const habitsService = {
  /**
   * Subscribe to user's habits with real-time updates
   */
  subscribeToUserHabits: (
    userId: string,
    onUpdate: (habits: UserHabit[]) => void,
    onError: (error: Error) => void
  ) => {
    return db
      .collection(HABITS_COLLECTION)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snapshot) => {
          const habits = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as UserHabit[];
          onUpdate(habits);
        },
        (error) => {
          console.error('Firestore listener error:', error);
          onError(error);
        }
      );
  },

  /**
   * Add a new habit
   */
  addHabit: async (userId: string, habit: Habit, duration: number): Promise<string> => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const docRef = await db.collection(HABITS_COLLECTION).add({
        ...habit,
        userId,
        duration,
        addedDate: today,
        completedDates: [],
        createdAt: firestore.FieldValue.serverTimestamp(),
        lastUpdated: firestore.FieldValue.serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding habit:', error);
      throw error;
    }
  },

  /**
   * Remove a habit
   */
  removeHabit: async (habitId: string): Promise<void> => {
    try {
      await db.collection(HABITS_COLLECTION).doc(habitId).delete();
    } catch (error) {
      console.error('Error removing habit:', error);
      throw error;
    }
  },

  /**
   * Toggle habit completion
   */
  toggleHabitCompletion: async (habitId: string, completedDates: string[]): Promise<void> => {
    try {
      await db.collection(HABITS_COLLECTION).doc(habitId).update({
        completedDates,
        lastUpdated: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error toggling habit completion:', error);
      throw error;
    }
  },
};

