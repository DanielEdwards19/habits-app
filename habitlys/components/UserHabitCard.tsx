import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { UserHabit } from '@/contexts/HabitsContext';

interface UserHabitCardProps {
  habit: UserHabit;
  isCompleted: boolean;
  onToggle: () => void;
}

export default function UserHabitCard({ habit, isCompleted, onToggle }: UserHabitCardProps) {
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const bg = useThemeColor({}, 'backgroundSecondary');
  const border = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = minutes / 60;
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  return (
    <Pressable
      style={[
        styles.card,
        { backgroundColor: bg },
        isCompleted && styles.completedCard,
      ]}
      onPress={onToggle}
    >
      <View style={styles.leftContent}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {habit.title}
        </ThemedText>
        <ThemedText type="default" style={styles.duration}>
          {formatDuration(habit.duration)}
        </ThemedText>
      </View>

      <View style={styles.rightContent}>
        <Ionicons
          name={isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
          size={32}
          color={isCompleted ? primaryColor : iconColor}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.sm,
  },
  completedCard: {
    opacity: 0.6,
  },
  leftContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  duration: {
    opacity: 0.7,
  },
  rightContent: {
    marginLeft: Spacing.md,
  },
});

