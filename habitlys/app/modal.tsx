import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import HabitsCard from "@/components/HabitsCard";

export default function ModalScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const tintColor = colors.text;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top", "bottom"]}
    >
      <Pressable
        onPress={() => router.back()}
        hitSlop={12}
        style={styles.closeButton}
        accessibilityRole="button"
        accessibilityLabel="Close"
      >
        <Ionicons name="close" size={32} color={tintColor} />
      </Pressable>

      <ThemedText type="title">Add A Habit</ThemedText>
      <HabitsCard
        title="Daily Walk"
        leftIcon="walk"
        onPress={() => console.log("Daily Walk")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  closeButton: {
    position: "absolute",
    top: 70,
    left: 20,
    zIndex: 10,
  },
});
