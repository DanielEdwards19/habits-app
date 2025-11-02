import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AuthProvider } from "@/contexts/AuthContext";
import { HabitsProvider } from "@/contexts/HabitsContext";
import { QuotesProvider } from "@/contexts/quotesContext";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)/home",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <HabitsProvider>
        <QuotesProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="auth/phone-sign-in"
              options={{
                headerShown: false,
                animation: "fade",
              }}
            />
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
        </QuotesProvider>
      </HabitsProvider>
    </AuthProvider>
  );
}
