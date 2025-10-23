import { Pressable, ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { Category, CategoryId } from "@/constants/habits";

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: CategoryId;
  onCategoryChange: (categoryId: CategoryId) => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        
        return (
          <Pressable
            key={category.id}
            onPress={() => onCategoryChange(category.id)}
            style={[
              styles.tab,
              isActive && {
                backgroundColor: colors.tint,
                borderRadius: 100,
              },
            ]}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={category.label}
          >
            <ThemedText
              style={[
                styles.tabText,
                isActive && styles.activeTabText,
              ]}
            >
              {category.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 50,
  },
  content: {
    paddingHorizontal: 20,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    overflow: 'hidden',
    minHeight: 40,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
  },
});