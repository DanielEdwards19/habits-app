export type CategoryId = "health" | "mental" | "productivity";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface Habit {
  id: string;
  title: string;
  icon: string;
  category: CategoryId;
}

export const CATEGORIES: Category[] = [
  { id: "health", label: "Health" },
  { id: "mental", label: "Mental Health" },
  { id: "productivity", label: "Productivity" },
];

export const HABITS: Habit[] = [
  // Health
  { id: "Gym", title: "Gym", icon: "walk", category: "health" },
  { id: "drink-water", title: "Drink Water", icon: "water", category: "health" },
  { id: "exercise", title: "Exercise", icon: "fitness", category: "health" },
  { id: "daily-walk", title: "Daily Walk", icon: "fitness", category: "health" },
  
  // Mental Health
  { id: "meditation", title: "Meditation", icon: "sparkles", category: "mental" },
  { id: "journaling", title: "Journaling", icon: "book", category: "mental" },
  { id: "gratitude", title: "Gratitude", icon: "heart", category: "mental" },
  
  // Productivity
  { id: "deep-work", title: "Deep Work", icon: "time", category: "productivity" },
  { id: "read", title: "Read", icon: "book-outline", category: "productivity" },
  { id: "learn", title: "Learn", icon: "school", category: "productivity" },
];