// Explore screen for HealthyLife.
// Provides curated health and wellness resources that complement the app's
// meal tracking, hydration, BMI, and general wellbeing features.

import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ResourceItem = {
  title: string;
  subtitle: string;
  description: string;
  url: string;
};

// Resource data: external links selected to support users with trusted health information.
const resources: ResourceItem[] = [
  {
    title: "NHS: Healthy eating",
    subtitle: "Trusted nutrition guidance",
    description:
      "Provides practical advice on balanced diets, healthier food choices, and building sustainable eating habits.",
    url: "https://www.nhs.uk/live-well/eat-well/",
  },
  {
    title: "WHO: Physical activity",
    subtitle: "Global recommendations",
    description:
      "Outlines evidence-based recommendations for physical activity and explains why movement is important for overall health.",
    url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
  },
  {
    title: "NHS: Hydration basics",
    subtitle: "Why water matters",
    description:
      "Explains the role of hydration in health and helps users understand why tracking water intake is important.",
    url: "https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/water-drinks-nutrition",
  },
  {
    title: "Project repository",
    subtitle: "Development reference",
    description:
      "Links to the project repository for technical reference and supporting project materials.",
    url: "https://github.com/godswill-ay/HealthyLife",
  },
];

// Main screen component: displays additional learning resources and opens trusted links.
export default function ExploreScreen() {
  // Action handler: checks if a URL can be opened before launching the external resource.
  async function open(url: string) {
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Screen header: introduces the purpose of the explore page. */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.sub}>
          Explore trusted resources that support healthy eating, hydration,
          physical activity, and wider health awareness.
        </Text>
      </View>

      {/* Intro section: explains why these resources are included in the app. */}
      <View style={styles.introCard}>
        <Text style={styles.introTitle}>Why this page matters</Text>
        <Text style={styles.introText}>
          HealthyLife focuses on practical daily tracking, but long-term health
          improvement also depends on understanding the habits behind the data.
          This page provides useful external resources to help users learn more
          about nutrition, hydration, exercise, and informed health choices.
        </Text>
      </View>

      {/* Resource list: displays external learning links in a structured card layout. */}
      <View style={styles.list}>
        {resources.map((resource) => (
          <TouchableOpacity
            key={resource.title}
            style={styles.card}
            onPress={() => open(resource.url)}
          >
            {/* Resource item: title, summary, and destination link for one external source. */}
            <Text style={styles.cardTitle}>{resource.title}</Text>
            <Text style={styles.cardSub}>{resource.subtitle}</Text>
            <Text style={styles.cardText}>{resource.description}</Text>
            <Text style={styles.link}>Open Resource</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// Styles: controls layout, spacing, typography, and card presentation for the explore screen.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
    gap: 14,
    paddingBottom: 32,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },
  sub: {
    color: "#6b7280",
    fontWeight: "600",
    lineHeight: 22,
  },
  introCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#f9fafb",
    gap: 8,
  },
  introTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
  },
  introText: {
    color: "#4b5563",
    lineHeight: 22,
    fontWeight: "500",
  },
  list: {
    gap: 12,
  },
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#f9fafb",
    gap: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },
  cardSub: {
    color: "#6b7280",
    fontWeight: "700",
  },
  cardText: {
    color: "#4b5563",
    lineHeight: 22,
    fontWeight: "500",
  },
  link: {
    color: "#2563eb",
    fontWeight: "700",
    marginTop: 4,
  },
});
