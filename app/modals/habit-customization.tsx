import { ModalHeader } from "@/components/ModalHeader";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { HABITS } from "@/constants/habits";
import { Colors, Spacing } from "@/constants/theme";
import { useHabitsContext } from "@/contexts/HabitsContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HabitCustomizationScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { addHabit } = useHabitsContext();
  const habitTitle = params.title as string || "Habit";
  
  const [duration, setDuration] = useState(30);

  // Find the habit from our constants
  const habit = HABITS.find(h => h.title === habitTitle) || HABITS[0];

  const handleDecreaseDuration = useCallback(() => {
    if (duration > 5) {
      setDuration(duration - 5);
    }
  }, [duration]);

  const handleIncreaseDuration = useCallback(() => {
    if (duration < 180) {
      setDuration(duration + 5);
    }
  }, [duration]);

  const handleAddHabit = useCallback(async () => {
    try {
      await addHabit(habit, duration);
      router.back();
      router.back(); // Go back to home screen
    } catch (error) {
      console.error('Failed to add habit:', error);
    }
  }, [habit, duration, addHabit]);

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
        title={habitTitle}
        onClose={handleClose}
        tintColor={colors.text}
      />

      {/* Duration Selection Card */}
      <ThemedView style={styles.content}>
        <ThemedView style={[styles.durationCard, { backgroundColor: colors.backgroundSecondary }]}>
          <ThemedText type="default" style={styles.question}>
            How long do you want to spend in the {habitTitle}?
          </ThemedText>
          
          <View style={styles.durationControls}>
            <Pressable
              style={[styles.durationButton, { backgroundColor: colors.primary }]}
              onPress={handleDecreaseDuration}
            >
              <Ionicons name="remove" size={24} color="#FFFFFF" />
            </Pressable>
            
            <View style={[styles.durationDisplay, { borderColor: colors.border }]}>
              <ThemedText type="title" style={styles.durationValue}>
                {duration}
              </ThemedText>
              <ThemedText type="default" style={styles.durationUnit}>
                mins
              </ThemedText>
            </View>
            
            <Pressable
              style={[styles.durationButton, { backgroundColor: colors.primary }]}
              onPress={handleIncreaseDuration}
            >
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
        </ThemedView>

        {/* Add Habit Button */}
        <Pressable
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={handleAddHabit}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <ThemedText
            type="defaultSemiBold"
            lightColor="#FFFFFF"
            darkColor="#FFFFFF"
          >
            Add Habit
          </ThemedText>
        </Pressable>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-between',
    paddingBottom: Spacing.xl,
  },
  durationCard: {
    borderRadius: 16,
    padding: Spacing.xl,
    marginTop: Spacing.xl,
  },
  question: {
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  durationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
    marginTop: Spacing.lg,
  },
  durationButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationDisplay: {
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    minWidth: 120,
  },
  durationValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  durationUnit: {
    fontSize: 16,
    marginTop: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 28,
    gap: Spacing.sm,
  },
});

