// About page for HealthyLife.
// Explains the purpose, motivation, and design approach of the system.
// Complements the Learn page (how to use) by focusing on why the app exists.

import PublicNavbar from "@/components/public-navbar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// AboutPage component:
// - Describes what HealthyLife is
// - Explains the problem it addresses
// - Outlines the design approach and key features
export default function AboutPage() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageWrapper}>
        {/* Shared public navbar for consistent branding and navigation */}
        <PublicNavbar />

        {/* Main content container for the about page */}
        <View style={styles.contentBox}>
          {/* Main heading */}
          <Text style={styles.title}>About HealthyLife</Text>

          {/* Section: Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What is HealthyLife?</Text>
            <Text style={styles.text}>
              HealthyLife is a web-based health tracking application designed to
              help users build better daily habits through simple and consistent
              self-monitoring. The platform focuses on core health activities
              such as meal tracking, hydration tracking, and BMI monitoring.
            </Text>
          </View>

          {/* Section: Problem / Motivation */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Why HealthyLife Exists</Text>
            <Text style={styles.text}>
              Many existing health applications are feature-heavy and difficult
              to maintain consistently. Users often struggle to stay engaged
              with complex interfaces or overly detailed tracking systems, which
              can reduce long-term adherence to healthy routines.
            </Text>
          </View>

          {/* Section: Solution */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What We Do</Text>
            <Text style={styles.text}>
              HealthyLife addresses this problem by prioritising simplicity and
              usability. Instead of overwhelming users with excessive features,
              the system focuses on a small set of essential tools that are easy
              to use and encourage daily interaction.
            </Text>
          </View>

          {/* Section: Features summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Features</Text>
            <Text style={styles.text}>
              The application provides core features including meal logging,
              water intake tracking, and automatic BMI calculation. These
              features work together to give users a clearer understanding of
              their daily habits without requiring complex setup or effort.
            </Text>
          </View>

          {/* Section: Purpose */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Goal</Text>
            <Text style={styles.text}>
              The overall goal of HealthyLife is to support long-term health
              awareness by making tracking accessible and sustainable. By
              simplifying the process, the platform aims to improve consistency
              and help users make more informed decisions about their wellbeing.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Styles for layout, spacing, and typography of the about page.
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
