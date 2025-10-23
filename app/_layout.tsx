import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { HabitsProvider } from "@/contexts/HabitsContext";

export const unstable_settings = {
  anchor: "screens/home",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <HabitsProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="screens/home" options={{ headerShown: false }} />
          <Stack.Screen
            name="modals/add-habit"
            options={{
              presentation: "fullScreenModal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="modals/habit-customization"
            options={{
              presentation: "fullScreenModal",
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </HabitsProvider>
  );
}
