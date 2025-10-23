import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Spacing } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { useHabitsContext } from "@/contexts/HabitsContext";
import UserHabitCard from "@/components/UserHabitCard";
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { userHabits, toggleHabitCompletion, isHabitCompleted } = useHabitsContext();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={["top", "bottom"]}
    >
      {/* Header */}
      <ThemedView style={styles.header}>
        <Pressable style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={colors.text} />
        </Pressable>
        
        <ThemedView style={styles.progressContainer}>
          <Ionicons name="water" size={16} color={colors.primary} />
          <ThemedText type="default" style={styles.progressText}>
            10/300
          </ThemedText>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '3%' }]} />
          </View>
        </ThemedView>
        
        <Pressable 
          style={styles.editButton}
          onPress={() => router.push("/modals/add-habit")}
        >
          <ThemedText type="default" style={styles.editText}>Edit</ThemedText>
          <Ionicons name="add-circle-outline" size={16} color={colors.text} />
        </Pressable>
      </ThemedView>

      {/* Main Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.container}>
          <Image
            source={require("@/assets/images/waterdrop.png")}
            style={styles.logo}
            contentFit="contain"
            priority="high"
          />

          {userHabits.length === 0 ? (
            // Empty State
            <>
              <ThemedText type="title" style={styles.title}>
                Build your daily habits
              </ThemedText>

              <ThemedText type="default" style={styles.subtitle}>
                Add your habits, tick them off each day, and earn your first drops.
              </ThemedText>

              <ThemedText type="default" style={styles.tagline}>
                Small daily actions → real-world change.
              </ThemedText>

              <Pressable
                style={[styles.addButton, { backgroundColor: colors.primary }]}
                onPress={() => router.push("/modals/add-habit")}
              >
                <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" />
                <ThemedText
                  type="defaultSemiBold"
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                >
                  Add your first habit
                </ThemedText>
              </Pressable>
            </>
          ) : (
            // Habits List State
            <>
              <ThemedText type="default" style={styles.motivationText}>
                Complete 30 days (300 drops) to unlock{" "}
                <ThemedText
                  type="defaultSemiBold"
                  style={{ color: colors.primary }}
                >
                  480 Litres of real clean water
                </ThemedText>{" "}
                for African communities.
              </ThemedText>

              {/* Daily Habits Section */}
              <ThemedView style={styles.habitsSection}>
                <ThemedText type="title" style={styles.sectionTitle}>
                  Day 1
                </ThemedText>
                
                {userHabits.map((habit) => (
                  <UserHabitCard
                    key={habit.id}
                    habit={habit}
                    isCompleted={isHabitCompleted(habit.id)}
                    onToggle={() => toggleHabitCompletion(habit.id)}
                  />
                ))}
              </ThemedView>

              {/* Finished Button */}
              <Pressable
                style={[styles.finishedButton, { backgroundColor: colors.primary }]}
                onPress={() => {
                  // TODO: Handle finishing daily habits
                  console.log("Finished daily habits");
                }}
              >
                <ThemedText
                  type="defaultSemiBold"
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                >
                  Finished Daily Habits
                </ThemedText>
              </Pressable>
            </>
          )}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  menuButton: {
    padding: Spacing.sm,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: Spacing.md,
  },
  progressText: {
    marginLeft: Spacing.sm,
    marginRight: Spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
  },
  editText: {
    marginRight: Spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  logo: {
    width: "40%",
    aspectRatio: 0.8,
    marginBottom: Spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  tagline: {
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  addButton: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  motivationText: {
    textAlign: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  habitsSection: {
    width: '100%',
    flex: 1,
  },
  sectionTitle: {
    marginBottom: Spacing.lg,
  },
  finishedButton: {
    width: '100%',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 28,
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
});
