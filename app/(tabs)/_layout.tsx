import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Redirect, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getCurrentUser } from "@/src/storage/auth";

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
  // Web: Ionicons (font-based)
  if (Platform.OS === "web") {
    return <Ionicons name={web} size={size} color={color} />;
  }
  // Mobile: keep your existing IconSymbol
  return <IconSymbol size={size} name={ios as any} color={color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // IMPORTANT: ensure Ionicons font is loaded for static web builds (Vercel)
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      setAuthed(!!user);
      setReady(true);
    })();
  }, []);

  // On web, don’t render tabs until the icon font is loaded
  if (Platform.OS === "web" && !fontsLoaded) return null;

  if (!ready) return null;
  if (!authed) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <WebSafeIcon ios="house.fill" web="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: "Meals",
          tabBarIcon: ({ color, size }) => (
            <WebSafeIcon ios="fork.knife" web="restaurant" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="water"
        options={{
          title: "Water",
          tabBarIcon: ({ color, size }) => (
            <WebSafeIcon ios="drop.fill" web="water" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="bmi"
        options={{
          title: "BMI",
          tabBarIcon: ({ color, size }) => (
            <WebSafeIcon ios="heart.fill" web="heart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <WebSafeIcon ios="paperplane.fill" web="compass" color={color} size={size} />
          ),
        }}
      />
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
