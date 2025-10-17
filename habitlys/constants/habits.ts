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
  { id: "drink-water", title: "Drink Water — 2 L", icon: "water-outline", category: "health" },
  { id: "daily-walk", title: "Daily Walk — 20 min", icon: "walk-outline", category: "health" },
  { id: "sleep-early", title: "Sleep Early — Before 11 PM", icon: "moon-outline", category: "health" },
  { id: "morning-stretch", title: "Morning Stretch — 5 min", icon: "fitness-outline", category: "health" },
  { id: "vitamins", title: "Vitamins — Daily", icon: "medical-outline", category: "health" },
  
  // 🌿 Mental Health
  { id: "meditate", title: "Meditate — 5 min", icon: "leaf-outline", category: "mental" },
  { id: "gratitude-list", title: "Gratitude List — 3 items", icon: "heart-outline", category: "mental" },
  { id: "digital-detox", title: "Digital Detox — 1 hr", icon: "phone-portrait-outline", category: "mental" },
  { id: "sunshine-break", title: "Sunshine Break — 10 min", icon: "sunny-outline", category: "mental" },
  { id: "read-calmly", title: "Read Calmly — 10 min", icon: "book-outline", category: "mental" },
  
  // ⚡ Productivity
  { id: "plan-day", title: "Plan Day — 3 tasks", icon: "calendar-outline", category: "productivity" },
  { id: "deep-work", title: "Deep Work — 25 min", icon: "timer-outline", category: "productivity" },
  { id: "tidy-desk", title: "Tidy Desk — End of day", icon: "desktop-outline", category: "productivity" },
  { id: "clear-inbox", title: "Clear Inbox — 1× daily", icon: "mail-outline", category: "productivity" },
  { id: "goal-review", title: "Goal Review — 5 min", icon: "flag-outline", category: "productivity" },
  
  // 📚 Learning
  { id: "read-book", title: "Read Book — 10 pages", icon: "library-outline", category: "learning" },
  { id: "study-lesson", title: "Study Lesson — 1 module", icon: "school-outline", category: "learning" },
  { id: "language-practice", title: "Language Practice — 10 min", icon: "language-outline", category: "learning" },
  { id: "watch-tutorial", title: "Watch Tutorial — 1 video", icon: "play-circle-outline", category: "learning" },
  { id: "take-notes", title: "Take Notes — 3 points", icon: "create-outline", category: "learning" },
];