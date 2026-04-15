// Root layout file for the entire HealthyLife application.
// This file defines the global navigation structure and theme handling.
// It wraps all screens (public pages and authenticated tabs) in a shared layout.

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

// Custom hook used to detect whether the user is in light or dark mode.
import { useColorScheme } from "@/hooks/use-color-scheme";

// RootLayout component:
// - Controls global navigation using Expo Router Stack
// - Applies theme (light/dark) across the whole app
// - Ensures consistent structure for all screens
export default function RootLayout() {
  // Detect current system color scheme (light or dark)
  const colorScheme = useColorScheme();

  // ThemeProvider applies the selected theme to all child components.
  // If user is in dark mode, DarkTheme is applied, otherwise DefaultTheme.
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* Stack navigator defines all top-level routes in the app.
          headerShown: false removes default navigation headers for a cleaner UI. */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* Landing page (public home screen) */}
        <Stack.Screen name="index" />
        {/* Login screen for existing users */}
        <Stack.Screen name="login" />
        {/* Registration screen for new users */}
        <Stack.Screen name="register" />
        {/* Main authenticated app (dashboard with tabs navigation) */}
        <Stack.Screen name="(tabs)" />
        {/* Modal screen displayed as an overlay (used for temporary interactions) */}
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
      {/* Controls the appearance of the device status bar (battery, time, etc.) */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
