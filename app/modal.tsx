// Modal screen for HealthyLife.
// Provides a simple overlay view used for temporary information or navigation actions.

import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

// Main screen component: renders modal content and provides navigation back to home
export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Screen layout: centered container for modal content */}
      {/* Title: indicates the purpose of this modal screen */}
      <ThemedText type="title">This is a modal</ThemedText>
      {/* Navigation: dismisses the modal and returns user to the home screen */}
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}

// Styles: controls layout, spacing, and alignment for the modal screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
