import { useState, useCallback } from "react";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { ModalHeader } from "@/components/ModalHeader";
import { CategoryTabs } from "../components/CategoryTabs";
import { HabitsList } from "@/components/HabitsList";
import { useHabits } from "@/hooks/useHabits";
import { CATEGORIES, CategoryId, Habit } from "@/constants/habits";

export default function ModalScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [activeCategory, setActiveCategory] = useState<CategoryId>("health");
  
  const filteredHabits = useHabits(activeCategory);

  const handleHabitPress = useCallback((habit: Habit) => {
    console.log("Selected habit:", habit.title);
  }, []);

  const handleClose = useCallback(() => {
    router.back();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top", "bottom"]}
    >
      <ModalHeader
        title="Add A Habit"
        onClose={handleClose}
        tintColor={colors.text}
      />

      <CategoryTabs
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <HabitsList
        habits={filteredHabits}
        onHabitPress={handleHabitPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
  },
});