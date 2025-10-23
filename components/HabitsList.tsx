import { ScrollView, StyleSheet } from "react-native";
import HabitsCard from "@/components/HabitsCard";
import { Habit } from "@/constants/habits";

interface HabitsListProps {
  habits: Habit[];
  onHabitPress: (habit: Habit) => void;
}

export function HabitsList({ habits, onHabitPress }: HabitsListProps) {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {habits.map((habit) => (
        <HabitsCard
          key={habit.id}
          title={habit.title}
          onPress={() => onHabitPress(habit)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
});