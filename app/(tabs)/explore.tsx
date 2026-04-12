import React from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Item = { title: string; subtitle: string; url: string };

const items: Item[] = [
  { title: "NHS: Healthy eating", subtitle: "Trusted nutrition guidance", url: "https://www.nhs.uk/live-well/eat-well/" },
  { title: "WHO: Physical activity", subtitle: "Global recommendations", url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity" },
  { title: "Hydration basics", subtitle: "Why water matters", url: "https://www.cdc.gov/healthyweight/healthy_eating/water-and-healthier-drinks.html" },
  { title: "Project repository", subtitle: "Your GitHub profile", url: "https://github.com/godswill-ay/" },
];

export default function ExploreScreen() {
  async function open(url: string) {
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.sub}>Useful resources and links for your fitness journey.</Text>

      {items.map((it) => (
        <TouchableOpacity key={it.title} style={styles.card} onPress={() => open(it.url)}>
          <Text style={styles.cardTitle}>{it.title}</Text>
          <Text style={styles.cardSub}>{it.subtitle}</Text>
          <Text style={styles.link}>{it.url}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff", gap: 12 },
  title: { fontSize: 24, fontWeight: "800", color: "#111827" },
  sub: { color: "#6b7280", fontWeight: "600", marginBottom: 6 },
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#f9fafb",
    gap: 6,
  },
  cardTitle: { fontSize: 16, fontWeight: "800", color: "#111827" },
  cardSub: { color: "#6b7280", fontWeight: "600" },
  link: { color: "#2563eb", fontWeight: "700" },
});
