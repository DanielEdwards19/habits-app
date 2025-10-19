import { useState, useCallback } from "react";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { ModalHeader } from "@/components/ModalHeader";
import { CategoryTabs } from "@/components/CategoryTabs";
import { HabitsList } from "@/components/HabitsList";
import { useHabits } from "@/hooks/useHabits";
import { CATEGORIES, CategoryId, Habit } from "@/constants/habits";

export default function ModalScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState<CategoryId>("health");
  
  const filteredHabits = useHabits(activeCategory);

  const handleHabitPress = useCallback((habit: Habit) => {
    router.push({
      pathname: "/modals/habit-customization",
      params: { title: habit.title }
    });
  }, []);

  const handleClose = useCallback(() => {
    router.back();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});