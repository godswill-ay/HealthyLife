// Tabs layout for the main authenticated area of the HealthyLife app.
// This file controls:
// - Tab navigation (Dashboard, Meals, Water, BMI, etc.)
// - Authentication check (redirects unauthenticated users)
// - Icon handling across web and mobile platforms

import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Redirect, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getCurrentUser } from "@/src/storage/auth";

// WebSafeIcon component:
// Handles platform differences for icons.
// - Web uses Ionicons (font-based icons)
// - Mobile uses IconSymbol (native symbol system)
function WebSafeIcon({
  ios,
  web,
  color,
  size = 28,
}: {
  ios: string;
  web: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  size?: number;
}) {
  // Use Ionicons for web builds
  if (Platform.OS === "web") {
    return <Ionicons name={web} size={size} color={color} />;
  }

  // Use native icon system for mobile
  return <IconSymbol size={size} name={ios as any} color={color} />;
}

// TabLayout component:
// - Checks if user is authenticated
// - Loads required fonts for icons
// - Defines tab navigation for the main app
export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Load icon fonts (required for web builds, especially on Vercel)
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  // State to control rendering readiness and authentication status
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    // Check if a user is currently logged in
    (async () => {
      const user = await getCurrentUser();

      // Convert user object to boolean authentication state
      setAuthed(!!user);

      // Mark app as ready after auth check completes
      setReady(true);
    })();
  }, []);

  // Prevent rendering until icon fonts are loaded (important for web)
  if (Platform.OS === "web" && !fontsLoaded) return null;

  // Prevent rendering until authentication check completes
  if (!ready) return null;

  // Redirect unauthenticated users back to login page
  if (!authed) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        // Apply theme color to active tab
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,

        // Remove default header for cleaner UI
        headerShown: false,

        // Add haptic feedback on tab press (mobile UX improvement)
        tabBarButton: HapticTab,
      }}
    >
      {/* Dashboard screen (main landing after login) */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <WebSafeIcon
              ios="house.fill"
              web="home"
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Meals tracking screen */}
      <Tabs.Screen
        name="meals"
        options={{
          title: "Meals",
          tabBarIcon: ({ color, size }) => (
            <WebSafeIcon
              ios="fork.knife"
              web="restaurant"
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Water intake tracking screen */}
      <Tabs.Screen
        name="water"
        options={{
          title: "Water",
          tabBarIcon: ({ color, size }) => (
            <WebSafeIcon
              ios="drop.fill"
              web="water"
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* BMI calculation screen */}
      <Tabs.Screen
        name="bmi"
        options={{
          title: "BMI",
          tabBarIcon: ({ color, size }) => (
            <WebSafeIcon
              ios="heart.fill"
              web="heart"
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Explore / additional content screen */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <WebSafeIcon
              ios="paperplane.fill"
              web="compass"
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Logout screen (clears session and redirects user) */}
      <Tabs.Screen
        name="logout"
        options={{
          title: "Logout",
          tabBarIcon: ({ color, size }) => (
            <WebSafeIcon
              ios="rectangle.portrait.and.arrow.right"
              web="log-out"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
