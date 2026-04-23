// Registration screen for HealthyLife.
// Allows new users to create an account and immediately enter the main app.
// Uses local form state, basic validation, and auth storage to save new users.

// Expo Router handles navigation between authentication screens and the main app.
import PublicNavbar from "@/components/public-navbar";
import { registerUser } from "@/src/storage/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

// RegisterScreen component:
// - Renders the account creation form
// - Collects user details needed for registration
// - Validates input before saving the new user
// - Redirects the user into the app after successful registration
export default function RegisterScreen() {
  // Router instance used for programmatic navigation after registration.
  const router = useRouter();

  // Form state:
  // Stores registration input values and any validation/authentication feedback.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  // onRegister:
  // 1. Clears any previous feedback message
  // 2. Validates user input before submission
  // 3. Calls registerUser to persist the new account
  // 4. Redirects the user into the main app when registration succeeds
  async function onRegister() {
    // Clear any old error or status message before running validation again.
    setMsg("");

    // Prevent submission if any required field is empty.
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      return setMsg("Please fill in all fields.");
    }

    // Prevent registration if the password confirmation does not match.
    if (password !== confirmPassword) {
      return setMsg("Passwords do not match.");
    }

    // Save the new user using the shared registration/auth logic.
    const res = await registerUser({
      name: name.trim(),
      email: email.trim(),
      password,
    });

    // If registration fails, show the returned error message to the user.
    if (!res.ok) return setMsg(res.error);

    // Mirrors the newly registered user's basic profile under a dedicated key
    // so other UI areas can read and update profile details consistently.
    await AsyncStorage.setItem(
      "userProfile",
      JSON.stringify({
        name: name.trim(),
        email: email.trim(),
      }),
    );

    // Successful registration: move the user directly into the main app flow.
    // `replace` avoids leaving the register screen in the back navigation stack.
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
            Shows the full navigation so the current Sign Up page can be
            highlighted consistently with the other public pages. */}
        <PublicNavbar showAuthButtons />

        {/* Centered form container used to position the registration card on the page. */}
        <View style={styles.formSection}>
          {/* Card container groups the registration fields into a clear visual section. */}
          <View style={styles.card}>
            {/* Page heading introducing the purpose of this screen. */}
            <Text style={styles.title}>Create Account</Text>
            {/* Short supporting text that explains the benefit of creating an account. */}
            <Text style={styles.subtitle}>
              Join HealthyLife and start tracking your wellness journey.
            </Text>

            {/* Conditional feedback message shown only when validation or registration fails. */}
            {msg ? <Text style={styles.error}>{msg}</Text> : null}

            {/* Full name input field used to identify the new user account. */}
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />

            {/* Email input field used as the account login identifier. */}
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

            {/* Password input field for the new account. */}
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />

            {/* Confirmation field used to reduce password entry mistakes. */}
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />

            {/* Sign-up button submits the form and triggers the registration workflow. */}
            <TouchableOpacity style={styles.button} onPress={onRegister}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Navigation link for users who already have an account and want to sign in instead. */}
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Link href="/login" style={styles.link}>
                Sign in
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Styles for the registration screen layout, typography, spacing, and form appearance.
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
    maxWidth: 480,
    backgroundColor: "#2A3158",
    borderRadius: 24,
    padding: 28,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: "#E6EAF5",
    marginBottom: 18,
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
