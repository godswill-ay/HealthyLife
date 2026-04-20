// Login screen for HealthyLife.
// Allows existing users to authenticate and access the main app dashboard.
// Uses local state for form inputs and calls auth storage to validate credentials.

import PublicNavbar from "@/components/public-navbar";
import { loginUser } from "@/src/storage/auth";
// Expo Router is used for navigation between screens (login -> main tabs, etc.)
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// LoginScreen component:
// - Renders the login form UI
// - Captures user credentials (email & password)
// - Calls loginUser to validate credentials
// - Redirects to the main app on success
export default function LoginScreen() {
  // Router instance used to programmatically navigate between screens
  const router = useRouter();

  // Form state:
  // Stores user input and any authentication error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // onLogin:
  // 1. Clears previous errors
  // 2. Sends credentials to loginUser (auth logic)
  // 3. If valid, navigates user into the main app (tabs)
  // 4. If invalid, displays returned error message
  async function onLogin() {
    setMsg(""); // Clear previous error messages

    // Call authentication function to verify credentials
    const res = await loginUser({ email, password });

    // If login fails, display error message
    if (!res.ok) return setMsg(res.error);

    // Successful login: replace current route with the main app stack
    router.replace("/(tabs)");
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageWrapper}>
        {/* Shared public navbar:
            Shows the full navigation so the current Sign In page can be
            highlighted consistently with the other public pages. */}
        <PublicNavbar showAuthButtons />

        {/* Centered form container for login inputs and actions */}
        <View style={styles.formSection}>
          {/* Card container provides visual grouping and contrast for the form */}
          <View style={styles.card}>
            {/* Page title */}
            <Text style={styles.title}>Login</Text>

            {/* Error message display (only shows if msg exists) */}
            {msg ? <Text style={styles.error}>{msg}</Text> : null}

            {/* Email input field: captures user's email for authentication */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="you@gmail.com"
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />

            {/* Password input field: captures user's password securely */}
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />

            {/* Login button: triggers onLogin handler to authenticate user */}
            <TouchableOpacity style={styles.button} onPress={onLogin}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Navigation link: directs new users to the registration page */}
            <Text style={styles.footerText}>
              Don&apos;t have an account?{" "}
              <Link href="/register" style={styles.link}>
                Create one
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Styles for layout, spacing, and visual design of the login screen.
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1F2544",
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  pageWrapper: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  formSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  card: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: "#2A3158",
    borderRadius: 24,
    padding: 28,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  error: {
    color: "#FCA5A5",
    marginBottom: 14,
    fontSize: 15,
  },
  label: {
    color: "#E6EAF5",
    fontSize: 15,
    marginBottom: 8,
    marginTop: 10,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 10,
    color: "#0F172A",
  },
  button: {
    backgroundColor: "#49DD7D",
    paddingVertical: 15,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 14,
  },
  buttonText: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "700",
  },
  footerText: {
    color: "#E6EAF5",
    marginTop: 18,
    textAlign: "center",
    fontSize: 15,
  },
  link: {
    color: "#49DD7D",
    fontWeight: "700",
  },
});
