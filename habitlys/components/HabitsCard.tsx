import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

type HabitsCardProps = {
  title: string;
  onPress?: () => void;
};

export default function HabitsCard({ title, onPress }: HabitsCardProps) {
  const bg = useThemeColor({}, 'backgroundSecondary');
  const border = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <Pressable
      style={[styles.card, { backgroundColor: bg, borderColor: border }]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </View>

      <View style={styles.rightIcon}>
        <Ionicons name="add-circle-outline" size={22} color={iconColor} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: Spacing.md,
  },
  content: { 
    flex: 1 
  },
  rightIcon: { 
    marginLeft: Spacing.sm
  },
});
