export type CategoryId = "health" | "mental" | "productivity" | "learning";

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
  { id: "health", label: "🧠 Health" },
  { id: "mental", label: "🌿 Mental Health" },
  { id: "productivity", label: "⚡ Productivity" },
  { id: "learning", label: "📚 Learning" },
];

export const HABITS: Habit[] = [
  // 🧠 Health
  { id: "drink-water", title: "Drink Water", icon: "water-outline", category: "health" },
  { id: "daily-walk", title: "Daily Walk", icon: "walk-outline", category: "health" },
  { id: "sleep-early", title: "Sleep Early", icon: "moon-outline", category: "health" },
  { id: "morning-stretch", title: "Morning Stretch", icon: "fitness-outline", category: "health" },
  { id: "vitamins", title: "Vitamins", icon: "medical-outline", category: "health" },
  
  // 🌿 Mental Health
  { id: "meditate", title: "Meditate", icon: "leaf-outline", category: "mental" },
  { id: "gratitude-list", title: "Gratitude List", icon: "heart-outline", category: "mental" },
  { id: "digital-detox", title: "Digital Detox", icon: "phone-portrait-outline", category: "mental" },
  { id: "sunshine-break", title: "Sunshine Break", icon: "sunny-outline", category: "mental" },
  { id: "read-calmly", title: "Read Calmly", icon: "book-outline", category: "mental" },
  
  // ⚡ Productivity
  { id: "plan-day", title: "Plan Day", icon: "calendar-outline", category: "productivity" },
  { id: "deep-work", title: "Deep Work", icon: "timer-outline", category: "productivity" },
  { id: "tidy-desk", title: "Tidy Desk", icon: "desktop-outline", category: "productivity" },
  { id: "clear-inbox", title: "Clear Inbox", icon: "mail-outline", category: "productivity" },
  { id: "goal-review", title: "Goal Review", icon: "flag-outline", category: "productivity" },
  
  // 📚 Learning
  { id: "read-book", title: "Read Book", icon: "library-outline", category: "learning" },
  { id: "study-lesson", title: "Study Lesson", icon: "school-outline", category: "learning" },
  { id: "language-practice", title: "Language Practice", icon: "language-outline", category: "learning" },
  { id: "watch-tutorial", title: "Watch Tutorial", icon: "play-circle-outline", category: "learning" },
  { id: "take-notes", title: "Take Notes", icon: "create-outline", category: "learning" },
];