import PublicNavbar from "@/components/public-navbar";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

// Public landing page for HealthyLife.
// Displays the first impression of the app including branding, value proposition,
// and primary navigation actions (sign up or learn more).
// This is the entry point for all unauthenticated users.
export default function LandingPage() {
  // Get current screen width to dynamically control layout (responsive design).
  // This allows us to switch between mobile and desktop UI without separate components.
  const { width } = useWindowDimensions();
  // Define breakpoint: anything below 768px is treated as mobile layout.
  const isMobile = width < 768;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.outerWrapper,
          {
            paddingHorizontal: isMobile ? 20 : 72,
            paddingTop: isMobile ? 16 : 20,
          },
        ]}
      >
        {/* Shared navigation bar used across all public pages (landing, learn, about).
            Provides consistent branding and navigation entry points. */}
        <PublicNavbar />

        {/* Hero section:
            Core section of the landing page that communicates the main value of the app.
            Contains headline, description, CTA buttons, and visual image. */}
        <View
          style={[
            styles.heroSection,
            {
              flexDirection: isMobile ? "column" : "row",
              minHeight: isMobile ? undefined : 720,
              gap: isMobile ? 28 : 40,
              paddingTop: isMobile ? 24 : 32,
              alignItems: isMobile ? "stretch" : "center",
            },
          ]}
        >
          {/* Left column:
              Contains textual content (headline + description) and user actions.
              This is where we guide user decisions (sign up or explore more). */}
          <View
            style={[
              styles.leftColumn,
              {
                maxWidth: isMobile ? "100%" : 620,
                flex: isMobile ? undefined : 0.95,
              },
            ]}
          >
            {/* Section label:
                Acts as a category/tagline to give quick context before the main headline. */}
            <Text style={styles.sectionLabel}>PERSONAL HEALTH TRACKER</Text>

            {/* Main headline:
                Largest text on the page, designed to grab attention and communicate purpose. */}
            <Text
              style={[
                styles.heroTitle,
                {
                  fontSize: isMobile ? 48 : 84,
                  lineHeight: isMobile ? 56 : 92,
                  maxWidth: isMobile ? "100%" : 720,
                },
              ]}
            >
              Build healthier daily habits with confidence
            </Text>

            {/* Supporting description:
                Expands on the headline by explaining what the platform does and its benefits. */}
            <Text
              style={[
                styles.heroDescription,
                {
                  fontSize: isMobile ? 18 : 24,
                  lineHeight: isMobile ? 30 : 38,
                  maxWidth: isMobile ? "100%" : 650,
                },
              ]}
            >
              HealthyLife helps users monitor meals, water intake, BMI, and
              daily wellness activities through one simple and accessible
              digital platform designed to support better health decisions.
            </Text>

            {/* Call-to-action buttons:
                Provide immediate actions users can take (register or learn more). */}
            <View
              style={[
                styles.buttonRow,
                {
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "stretch" : "center",
                },
              ]}
            >
              {/* Primary CTA:
                  Main conversion button directing users to create an account. */}
              <Pressable
                style={[
                  styles.primaryButton,
                  isMobile && styles.fullWidthButton,
                ]}
                onPress={() => router.push("/register")}
              >
                <Text style={styles.primaryButtonText}>
                  Create Account for Free
                </Text>
              </Pressable>

              {/* Secondary CTA:
                  Allows users to explore more information before committing to sign up. */}
              <Pressable
                style={[
                  styles.secondaryButton,
                  isMobile && styles.fullWidthButton,
                ]}
                onPress={() => router.push("/about")}
              >
                <Text style={styles.secondaryButtonText}>Learn More</Text>
              </Pressable>
            </View>
          </View>

          {/* Right column:
              Displays a visual representation of the app's theme (health & fitness).
              Enhances user engagement and balances the layout visually. */}
          <View
            style={[
              styles.rightColumn,
              {
                flex: isMobile ? undefined : 0.9,
                alignItems: isMobile ? "center" : "flex-end",
              },
            ]}
          >
            {/* Image container:
                Wraps the image with styling (rounded corners, clipping, background). */}
            <View
              style={[
                styles.heroImageCard,
                {
                  maxWidth: isMobile ? "100%" : 560,
                  height: isMobile ? 280 : 520,
                  alignSelf: isMobile ? "stretch" : "flex-end",
                },
              ]}
            >
              {/* Hero image:
                  Static asset used to visually communicate the app’s purpose. */}
              <Image
                source={require("@/assets/images/landing-health.png")}
                style={styles.heroImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Styles for the landing page layout, typography, buttons, and hero image.
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1F2544",
  },
  contentContainer: {
    flexGrow: 1,
  },
  outerWrapper: {
    flex: 1,
    width: "100%",
    paddingBottom: 40,
  },
  heroSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftColumn: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D8DCF4",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 24,
  },
  heroDescription: {
    color: "#E7EAF5",
    marginBottom: 34,
  },
  buttonRow: {
    gap: 18,
    flexWrap: "wrap",
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#49DD7D",
    paddingVertical: 18,
    paddingHorizontal: 34,
    borderRadius: 999,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 999,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  fullWidthButton: {
    width: "100%",
  },
  rightColumn: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    // Slight right shift to push image closer to screen edge (desktop only effect)
    marginRight: -20,
  },
  heroImageCard: {
    width: "100%",
    borderRadius: 32,
    overflow: "hidden",
    backgroundColor: "#F8FAFC",
    // Ensures image visually aligns closer to navbar edge
    alignSelf: "flex-end",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
});
