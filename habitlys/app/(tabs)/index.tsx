import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.content}>
          <Image
            source={require('@/assets/images/waterdrop.png')}
            style={styles.logo}
            contentFit="contain"
            priority="high"
          />

          <ThemedText type="title" style={styles.title}>
            Build your Daily habits
          </ThemedText>

          <ThemedText type="default" style={styles.bodyText}>
            Stay focused and provide real clean water to communities in Africa.
          </ThemedText>
          <ThemedView style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, { backgroundColor: colors.primary, paddingVertical: 14 }]}
              onPress={() => console.log('Get Started pressed')}
            >
              <ThemedText
                type="defaultSemiBold"
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
                style={{ textAlign: 'center' }}
              >
                + Add your first habit
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
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
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    maxWidth: 400,
    width: '100%',
  },
  logo: {
    width: "50%",
    aspectRatio: 0.8,
    marginBottom: Spacing.xs,
  },
  title: {
    textAlign: "center",
  },
  bodyText: {
    textAlign: "center",
  },
  buttonContainer: {
    width: '100%',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  button: {
    borderRadius: 28,
  },
});
