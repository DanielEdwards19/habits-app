import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  tintColor: string;
}

export function ModalHeader({ title, onClose, tintColor }: ModalHeaderProps) {
  return (
    <>
      <Pressable
        onPress={onClose}
        hitSlop={12}
        style={styles.closeButton}
        accessibilityRole="button"
        accessibilityLabel="Close"
      >
        <Ionicons name="close" size={32} color={tintColor} />
      </Pressable>

      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>
    </>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 70,
    left: 20,
    zIndex: 10,
  },
  title: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
});