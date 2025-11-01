import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoalsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={["top", "bottom"]}
    >
      <ThemedView style={styles.container}>
        <Ionicons name="flag" size={80} color={colors.primary} style={styles.icon} />
        
        <ThemedText type="title" style={styles.title}>
          Goals Screen
        </ThemedText>

        <ThemedText type="default" style={styles.subtitle}>
          This is where your goals will live!
        </ThemedText>

        <ThemedText type="default" style={styles.description}>
          You can add goal tracking features here later.
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  icon: {
    marginBottom: Spacing.xl,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: Spacing.lg,
    fontSize: 18,
  },
  description: {
    textAlign: 'center',
    opacity: 0.7,
  },
});

