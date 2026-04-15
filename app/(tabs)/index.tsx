// Dashboard screen for the main authenticated area of HealthyLife.
// Summarises key daily health metrics, displays calorie trend data,
// and provides quick access to the app's main tracking features.

import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Expo Router links are used for quick navigation to other tab screens.
import { Link } from "expo-router";

import CaloriesTrendChart from "@/components/CaloriesTrendChart";
import { getCurrentUser } from "@/src/storage/auth";
import { loadLastBmi } from "@/src/storage/bmi";
import { loadGoals, saveGoals } from "@/src/storage/goals";
import { getTodayCaloriesTotal } from "@/src/storage/meals";
import { getLast7DaysCalories } from "@/src/storage/stats";
import { getTodayWaterTotalMl } from "@/src/storage/water";

// Returns a time-based greeting so the dashboard feels more personalised.
function getGreeting(now: Date) {
  const h = now.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

// Formats the current date into a readable string for the dashboard header.
function formatDate(now: Date) {
  return now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// Restricts progress values to a 0-1 range so progress bars never overflow.
function clamp01(n: number) {
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

// Reusable progress bar component used for calorie and water goal tracking.
// Converts a decimal progress value into a percentage width for the inner bar.
function ProgressBar({ value }: { value: number }) {
  const pct = Math.round(clamp01(value) * 100);
  return (
    <View style={styles.barOuter}>
      <View style={[styles.barInner, { width: `${pct}%` }]} />
    </View>
  );
}

// DashboardScreen component:
// - Loads the current user's name and saved goals
// - Retrieves daily calories, water total, BMI, and 7-day trend data
// - Displays summary cards and quick actions for core app features
export default function DashboardScreen() {
  // Capture current date once when the screen loads to keep greeting and date text stable.
  const now = useMemo(() => new Date(), []);
  const greeting = getGreeting(now);
  const dateText = formatDate(now);

  // User-specific state used to personalise the greeting.
  const [userName, setUserName] = useState<string>("");

  // Dashboard metric state: stores today's totals and derived health summary values.
  const [caloriesToday, setCaloriesToday] = useState(0);
  const [waterTodayMl, setWaterTodayMl] = useState(0);
  const [bmiStatus, setBmiStatus] = useState("Not calculated");
  const [trend, setTrend] = useState<{ label: string; value: number }[]>([]);
  const [showTrend, setShowTrend] = useState(true);

  // Goal input state: allows users to view and update daily calorie and water targets.
  const [calGoal, setCalGoal] = useState("2000");
  const [waterGoal, setWaterGoal] = useState("2000");
  const [savedGoals, setSavedGoals] = useState({
    caloriesTarget: 2000,
    waterTargetMl: 2000,
  });

  // Load current user details and any previously saved goals when the dashboard opens.
  useEffect(() => {
    (async () => {
      // Retrieve the active user so the greeting can display their name.
      const user = await getCurrentUser();
      setUserName(user?.name ?? "");
      // Load saved daily targets so dashboard progress can be calculated correctly.
      const g = await loadGoals();
      setSavedGoals(g);
      setCalGoal(String(g.caloriesTarget));
      setWaterGoal(String(g.waterTargetMl));
    })();
  }, []);

  // Load live dashboard data (calories, water, BMI, and chart values).
  // A small polling interval is used so recent changes appear without requiring manual refresh.
  useEffect(() => {
    let alive = true;

    async function load() {
      // Read today's calorie total from stored meal entries.
      const calories = await getTodayCaloriesTotal();
      // Read today's water total from stored hydration entries.
      const water = await getTodayWaterTotalMl();
      // Load the most recent BMI result so the dashboard can show current BMI status.
      const lastBmi = await loadLastBmi();
      // Load rolling 7-day calorie totals for the dashboard chart.
      const t = await getLast7DaysCalories();

      // Only update state if the component is still mounted.
      if (alive) {
        setCaloriesToday(calories);
        setWaterTodayMl(water);
        setBmiStatus(
          lastBmi
            ? `${lastBmi.bmi.toFixed(1)} (${lastBmi.category})`
            : "Not calculated",
        );
        setTrend(t);
      }
    }

    load();
    const id = setInterval(load, 1500);

    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // Saves updated calorie and water goals after validating numeric input.
  async function onSaveGoals() {
    // Convert text input values into numbers so they can be validated and stored.
    const c = Number(calGoal);
    const w = Number(waterGoal);
    // Ignore invalid or non-positive goal values.
    if (!Number.isFinite(c) || c <= 0) return;
    if (!Number.isFinite(w) || w <= 0) return;

    // Round and package validated goals into the format expected by storage.
    const g = { caloriesTarget: Math.round(c), waterTargetMl: Math.round(w) };
    await saveGoals(g);
    setSavedGoals(g);
  }

  // Progress values are calculated against the saved daily targets for display in progress bars.
  const calProgress = caloriesToday / savedGoals.caloriesTarget;
  const waterProgress = waterTodayMl / savedGoals.waterTargetMl;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {/* Dashboard header: greeting, current date, and app title. */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {greeting}
          {userName ? `, ${userName}` : ""}
        </Text>
        <Text style={styles.date}>{dateText}</Text>
        <Text style={styles.title}>HealthyLife</Text>
      </View>

      {/* Summary cards showing the most important daily health metrics. */}
      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Calories Today</Text>
          <Text style={styles.cardValue}>{caloriesToday}</Text>
          <Text style={styles.smallText}>{savedGoals.caloriesTarget} goal</Text>
          <ProgressBar value={calProgress} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Water Today</Text>
          <Text style={styles.cardValue}>{waterTodayMl} ml</Text>
          <Text style={styles.smallText}>
            {savedGoals.waterTargetMl} ml goal
          </Text>
          <ProgressBar value={waterProgress} />
        </View>

        <View style={[styles.card, styles.cardWide]}>
          <Text style={styles.cardLabel}>BMI Status</Text>
          <Text style={styles.cardValue}>{bmiStatus}</Text>
        </View>
      </View>

      {/* Section header used to toggle visibility of the 7-day calorie trend chart. */}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setShowTrend((s) => !s)}
      >
        <Text style={styles.sectionTitle}>7-day Calories Trend</Text>
        <Text style={styles.sectionAction}>{showTrend ? "Hide" : "Show"}</Text>
      </TouchableOpacity>

      {/* Conditionally render the chart so users can show or hide trend data. */}
      {showTrend ? <CaloriesTrendChart data={trend} /> : null}

      {/* Daily goals section allows users to review and update calorie and water targets. */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Goals</Text>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>Calories goal</Text>
            <TextInput
              value={calGoal}
              onChangeText={setCalGoal}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>Water goal (ml)</Text>
            <TextInput
              value={waterGoal}
              onChangeText={setWaterGoal}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        </View>

        <TouchableOpacity onPress={onSaveGoals} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save Goals</Text>
        </TouchableOpacity>
      </View>

      {/* Quick actions provide shortcuts to the app's main tracking screens. */}
      <View style={styles.actions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        {/* Shortcut to the meals screen for logging food intake. */}
        <Link href="/(tabs)/meals" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Log a Meal</Text>
          </TouchableOpacity>
        </Link>

        {/* Shortcut to the water screen for adding hydration entries. */}
        <Link href="/(tabs)/water" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Water</Text>
          </TouchableOpacity>
        </Link>

        {/* Shortcut to the BMI screen for calculating body mass index. */}
        <Link href="/(tabs)/bmi" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Calculate BMI</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

// Styles for dashboard layout, cards, form controls, buttons, and quick actions.
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  // KEY FIX: extra bottom padding so nothing hides behind tab bar
  content: { padding: 16, gap: 16, paddingBottom: 140 },

  header: { gap: 4, paddingTop: 8 },
  greeting: { fontSize: 20, fontWeight: "600", color: "#111827" },
  date: { fontSize: 14, color: "#6b7280" },
  title: { fontSize: 28, fontWeight: "800", marginTop: 6, color: "#111827" },

  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    width: "48%",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
    gap: 8,
  },
  cardWide: { width: "100%" },
  cardLabel: { fontSize: 13, color: "#6b7280", fontWeight: "600" },
  cardValue: { fontSize: 24, fontWeight: "800", color: "#111827" },
  smallText: { fontSize: 12, color: "#6b7280", fontWeight: "700" },

  barOuter: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#e5e7eb",
    overflow: "hidden",
  },
  barInner: { height: 10, borderRadius: 999, backgroundColor: "#111827" },

  section: { gap: 10 },
  row: { flexDirection: "row", gap: 10 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  sectionAction: { fontSize: 14, fontWeight: "800", color: "#2563eb" },

  inputLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "700",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  saveBtn: {
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: "#111827",
  },
  saveBtnText: { color: "#fff", fontWeight: "800", textAlign: "center" },

  actions: { gap: 10, marginTop: 8 },
  button: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  buttonText: { fontSize: 16, fontWeight: "700", color: "#111827" },
});
