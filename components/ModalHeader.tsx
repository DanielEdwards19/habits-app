import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { Spacing } from "@/constants/theme";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  tintColor: string;
}

export function ModalHeader({ title, onClose, tintColor }: ModalHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onClose}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Close"
      >
        <Ionicons name="close" size={32} color={tintColor} />
      </Pressable>

      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  title: {
    marginTop: Spacing.md,
  },
});