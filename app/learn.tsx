// Learn page for HealthyLife.
// This screen acts as a simple in-app guide that explains how users can
// understand and use the main features available in the application.

// Reusable navigation bar for public pages to keep branding and navigation consistent.
import PublicNavbar from "@/components/public-navbar";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

// LearnPage component:
// - Introduces the purpose of the app
// - Explains how each major feature should be used
// - Helps users understand the value of meal, water, and BMI tracking
export default function LearnPage() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.pageWrapper,
          {
            paddingHorizontal: isMobile ? 20 : 72,
            paddingTop: isMobile ? 16 : 20,
          },
        ]}
      >
        {/* Shared public navbar used across landing, learn, and about pages. */}
        <PublicNavbar />

        {/* Main content container for the learn page. */}
        <View
          style={[
            styles.contentBox,
            {
              paddingHorizontal: isMobile ? 24 : 44,
              paddingVertical: isMobile ? 28 : 44,
              marginTop: isMobile ? 20 : 32,
              width: "100%",
            },
          ]}
        >
          {/* Page heading introducing the purpose of this screen. */}
          <Text
            style={[
              styles.title,
              {
                fontSize: isMobile ? 28 : 48,
                lineHeight: isMobile ? 36 : 56,
                marginBottom: isMobile ? 18 : 22,
              },
            ]}
          >
            How to Use HealthyLife
          </Text>

          {/* Opening description that explains what users can learn on this page. */}
          <Text
            style={[
              styles.introText,
              {
                fontSize: isMobile ? 17 : 20,
                lineHeight: isMobile ? 28 : 32,
                marginBottom: isMobile ? 26 : 32,
                maxWidth: "100%",
              },
            ]}
          >
            HealthyLife is designed to make daily health tracking simple and
            practical. This page explains how to use each main feature step by
            step, so users can log meals, track water intake, calculate BMI, and
            review progress more confidently.
          </Text>

          {/* Feature guide: meal tracking */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  fontSize: isMobile ? 22 : 26,
                  marginBottom: isMobile ? 10 : 12,
                },
              ]}
            >
              Track Your Meals
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: isMobile ? 17 : 19,
                  lineHeight: isMobile ? 28 : 31,
                  maxWidth: "100%",
                },
              ]}
            >
              To use the Meals feature, open the Meals screen, type the name of
              the food you want to log, and enter its calorie value before
              pressing the Add button. Users can check food packaging, nutrition
              labels, or trusted online sources to estimate calories before
              saving the entry. Once added, the meal appears in the list below,
              where it can also be reviewed or deleted if needed.
            </Text>
          </View>

          {/* Feature guide: water tracking */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  fontSize: isMobile ? 22 : 26,
                  marginBottom: isMobile ? 10 : 12,
                },
              ]}
            >
              Track Your Water Intake
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: isMobile ? 17 : 19,
                  lineHeight: isMobile ? 28 : 31,
                  maxWidth: "100%",
                },
              ]}
            >
              To use the Water feature, open the Water screen, enter the amount
              of water consumed in millilitres, and press Add to save the entry.
              Users can repeat this whenever they drink water during the day so
              the running total stays updated. This makes it easier to compare
              current intake with their daily hydration goal on the dashboard.
            </Text>
          </View>

          {/* Feature guide: BMI calculation */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  fontSize: isMobile ? 22 : 26,
                  marginBottom: isMobile ? 10 : 12,
                },
              ]}
            >
              Calculate Your BMI
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: isMobile ? 17 : 19,
                  lineHeight: isMobile ? 28 : 31,
                  maxWidth: "100%",
                },
              ]}
            >
              To use the BMI feature, open the BMI screen, enter your height in
              centimetres and your weight in kilograms, then press Calculate &
              Save. The application will instantly display your BMI value and
              its health category, helping you understand your current body
              status in a simple and clear way.
            </Text>
          </View>

          {/* Feature guide: overall health awareness */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  fontSize: isMobile ? 22 : 26,
                  marginBottom: isMobile ? 10 : 12,
                },
              ]}
            >
              Review Your Daily Progress
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: isMobile ? 17 : 19,
                  lineHeight: isMobile ? 28 : 31,
                  maxWidth: "100%",
                },
              ]}
            >
              After logging meals, water, and BMI data, users can return to the
              dashboard to review their daily progress. The dashboard displays
              calorie totals, hydration progress, BMI status, and visual charts,
              making it easier to monitor habits over time and stay consistent
              with personal health goals.
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
  },
  contentBox: {
    backgroundColor: "#2A3158",
    borderRadius: 28,
  },
  title: {
    fontWeight: "800",
    color: "#FFFFFF",
  },
  introText: {
    color: "#E6E8F2",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#FFFFFF",
  },
  text: {
    color: "#E6E8F2",
  },
});
