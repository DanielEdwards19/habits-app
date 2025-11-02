import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing } from "@/constants/theme";
import { useQuotes } from "@/contexts/quotesContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoalsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { quotes, loading } = useQuotes();

  // Debug logging
  console.log('📚 Quotes loaded:', quotes.length);
  console.log('📚 Quotes data:', JSON.stringify(quotes, null, 2));

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <ThemedText type="default" style={styles.loadingText}>
            Loading quotes...
          </ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <ThemedView style={styles.header}>
        <Ionicons name="book" size={32} color={colors.primary} />
        <ThemedText type="title" style={styles.title}>
          Stoic Wisdom
        </ThemedText>
      </ThemedView>

      {quotes.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <Ionicons name="book-outline" size={80} color={colors.text + '40'} />
          <ThemedText type="default" style={styles.emptyText}>
            No quotes available yet
          </ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={quotes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
              <ThemedView style={[styles.quoteCard, { backgroundColor: colors.backgroundSecondary }]}>
                <Ionicons name="heart" size={24} color={colors.primary} style={styles.quoteIcon} />
                <ThemedText type="default" style={styles.quoteText}>
                  "{item.text}"
                </ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.author}>
                  — {item.author}
                </ThemedText>
                {item.category && (
                  <ThemedView style={[styles.categoryBadge, { backgroundColor: colors.primary + '20' }]}>
                    <ThemedText type="default" style={[styles.categoryText, { color: colors.primary }]}>
                      {item.category}
                    </ThemedText>
                  </ThemedView>
                )}
              </ThemedView>
            )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  title: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  emptyText: {
    marginTop: Spacing.md,
    opacity: 0.6,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  quoteCard: {
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.md,
  },
  quoteIcon: {
    marginBottom: Spacing.sm,
  },
  quoteText: {
    fontStyle: 'italic',
    marginBottom: Spacing.md,
    lineHeight: 24,
  },
  author: {
    textAlign: 'right',
    marginBottom: Spacing.sm,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
    marginTop: Spacing.sm,
  },
  categoryText: {
    fontSize: 12,
  },
});