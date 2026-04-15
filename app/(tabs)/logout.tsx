// Logout screen for HealthyLife.
// Clears the current user session and redirects the user back to the login page.
import { logoutUser } from "@/src/storage/auth";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

// Main screen component: triggers logout on mount and handles navigation flow
export default function LogoutScreen() {
  const router = useRouter();

  // Effect: runs once when the screen loads to perform logout and redirect
  useEffect(() => {
    (async () => {
      // Session clear: removes stored authentication data for the current user
      await logoutUser();
      // Navigation: redirect user to login screen after logout completes
      router.replace("/login");
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Screen layout: centered container displaying logout status */}
      {/* Status text: informs the user that logout is in progress */}
      <Text style={styles.text}>Logging out…</Text>
    </View>
  );
}

// Styles: controls layout and text appearance for the logout screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontWeight: "800", color: "#111827" },
});
