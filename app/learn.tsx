// Learn page for HealthyLife.
// This screen acts as a simple in-app guide that explains how users can
// understand and use the main features available in the application.

// Reusable navigation bar for public pages to keep branding and navigation consistent.
import PublicNavbar from "@/components/public-navbar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// LearnPage component:
// - Introduces the purpose of the app
// - Explains how each major feature should be used
// - Helps users understand the value of meal, water, and BMI tracking
export default function LearnPage() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageWrapper}>
        {/* Shared public navbar used across landing, learn, and about pages. */}
        <PublicNavbar />

        {/* Main content container for the learn page. */}
        <View style={styles.contentBox}>
          {/* Page heading introducing the purpose of this screen. */}
          <Text style={styles.title}>How to Use HealthyLife</Text>

          {/* Opening description that explains what users can learn on this page. */}
          <Text style={styles.introText}>
            HealthyLife is designed to help users build better health habits by
            making everyday tracking simple and easy to understand. This page
            explains how the main features of the app can be used to support
            healthier decisions and more consistent self-monitoring.
          </Text>

          {/* Feature guide: meal tracking */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Track Your Meals</Text>
            <Text style={styles.text}>
              The meals feature allows users to record what they eat during the
              day. This helps improve awareness of eating habits and makes it
              easier to stay consistent with nutrition goals over time.
            </Text>
          </View>

          {/* Feature guide: water tracking */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Track Your Water Intake</Text>
            <Text style={styles.text}>
              The water tracking feature helps users monitor daily hydration.
              Logging water intake regularly can encourage consistency and make
              it easier to maintain healthier hydration habits.
            </Text>
          </View>

          {/* Feature guide: BMI calculation */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Calculate Your BMI</Text>
            <Text style={styles.text}>
              The BMI feature allows users to enter their height and weight so
              the system can calculate their Body Mass Index. This gives users a
              simple way to assess their body status and monitor progress over
              time.
            </Text>
          </View>

          {/* Feature guide: overall health awareness */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Build Better Daily Awareness
            </Text>
            <Text style={styles.text}>
              By combining meal logging, water tracking, and BMI monitoring,
              HealthyLife helps users build a clearer picture of their health
              habits. The goal is not only tracking data, but also supporting
              long-term consistency and better self-awareness.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Styles for the learn page layout, section spacing, typography, and content containers.
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1F2544",
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 48,
  },
  pageWrapper: {
    width: "100%",
    maxWidth: 1520,
    alignSelf: "center",
    paddingHorizontal: 72,
    paddingTop: 20,
  },
  contentBox: {
    backgroundColor: "#2A3158",
    borderRadius: 28,
    paddingVertical: 44,
    paddingHorizontal: 44,
    marginTop: 32,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 22,
  },
  introText: {
    fontSize: 20,
    lineHeight: 32,
    color: "#E6E8F2",
    marginBottom: 32,
    maxWidth: 1080,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  text: {
    fontSize: 19,
    lineHeight: 31,
    color: "#E6E8F2",
    maxWidth: 1080,
  },
});
