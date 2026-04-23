// Meals screen for HealthyLife.
// Handles meal logging, calorie tracking, and displays daily totals.

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Meal, loadMeals, saveMeals } from "@/src/storage/meals";

// Utility function: compares two dates to determine if they represent the same calendar day
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// Main screen component: manages meal tracking state, user input, and UI rendering
export default function MealsScreen() {
  // Form state: stores user inputs and meal data
  const [nameInput, setNameInput] = useState("");
  const [caloriesInput, setCaloriesInput] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [msg, setMsg] = useState("");
  const hydratedRef = useRef(false);

  // Effect: loads stored meals from local storage
  useEffect(() => {
    (async () => {
      const saved = await loadMeals();
      setMeals(saved);
      hydratedRef.current = true;
    })();
  }, []);

  // calculates total calories consumed for the current day
  const todayTotal = useMemo(() => {
    // Get current date for filtering today's meals
    const now = new Date();
    // Filter meals to include only today's entries
    return (
      meals
        .filter((m) => isSameDay(new Date(m.createdAt), now))
        // Sum calories for all filtered meals
        .reduce((sum, m) => sum + m.calories, 0)
    );
  }, [meals]);

  // Action handler: creates a new meal entry and saves updated state
  async function addMeal() {
    // Convert calorie input to numeric value
    const n = Number(caloriesInput);
    // Trim meal name input to remove unnecessary whitespace
    const name = nameInput.trim();

    // Validation: require both meal name and calories before saving
    if (!name && !caloriesInput.trim()) {
      setMsg("Please enter a food name and calorie value.");
      return;
    }

    if (!name) {
      setMsg("Please enter a food name.");
      return;
    }

    if (!caloriesInput.trim()) {
      setMsg("Please enter a calorie value.");
      return;
    }

    // Validation: reject invalid or non-positive calorie values
    if (!Number.isFinite(n) || n <= 0) {
      setMsg("Please enter a valid calorie value greater than 0.");
      return;
    }

    // Create new meal object with unique ID and timestamp
    const meal: Meal = {
      id: String(Date.now()),
      name,
      calories: Math.round(n),
      createdAt: Date.now(),
    };

    // Add new meal to the top of the list (most recent first)
    const next = [meal, ...meals];
    setMeals(next);
    setNameInput("");
    setCaloriesInput("");
    setMsg("");

    // Persist updated meal list after initial load completes
    if (hydratedRef.current) await saveMeals(next);
  }

  // Action handler: deletes a specific meal entry and updates storage
  async function removeMeal(id: string) {
    const next = meals.filter((m) => m.id !== id);
    setMeals(next);
    if (hydratedRef.current) await saveMeals(next);
  }

  return (
    <View style={styles.container}>
      {/* Container: wraps entire meals screen layout */}
      {/* Title: indicates current screen purpose */}
      <Text style={styles.title}>Meals</Text>
      {/* Summary: shows total calories consumed today */}
      <Text style={styles.sub}>Today’s calories: {todayTotal}</Text>
      {msg ? <Text style={styles.error}>{msg}</Text> : null}

      {/* Input section: captures meal name */}
      <View style={styles.row}>
        <TextInput
          value={nameInput}
          onChangeText={(text) => {
            setNameInput(text);
            if (msg) setMsg("");
          }}
          placeholder="Food name (e.g. Chicken wrap)"
          style={styles.input}
        />
      </View>

      {/* Input section: captures calories and triggers add action */}
      <View style={styles.row}>
        <TextInput
          value={caloriesInput}
          onChangeText={(text) => {
            setCaloriesInput(text);
            if (msg) setMsg("");
          }}
          placeholder="Calories (e.g. 450)"
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity onPress={addMeal} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Data list: renders all saved meals in reverse chronological order.
          Also includes an empty state when no meals are available. */}
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10, paddingTop: 12 }}
        renderItem={({ item }) => (
          <>
            {/* Item: displays individual meal entry */}
            <View style={styles.item}>
              <View style={{ gap: 4, flex: 1 }}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemMeta}>
                  {item.calories} cal •{" "}
                  {new Date(item.createdAt).toLocaleString()}
                </Text>
              </View>

              {/* Action: removes selected meal entry */}
              <TouchableOpacity
                onPress={() => removeMeal(item.id)}
                style={styles.delete}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No meals yet. Add your first one.</Text>
        }
      />
    </View>
  );
}

// Styles for layout, inputs, list items, and buttons on the meals screen
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "800", color: "#111827" },
  sub: { marginTop: 6, color: "#6b7280", fontWeight: "600" },
  error: { marginTop: 8, color: "#b91c1c", fontWeight: "600" },
  row: { flexDirection: "row", gap: 10, marginTop: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  button: {
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#111827",
  },
  buttonText: { color: "#fff", fontWeight: "800" },
  item: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  itemTitle: { fontSize: 16, fontWeight: "800", color: "#111827" },
  itemMeta: { fontSize: 12, color: "#6b7280" },
  delete: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fecaca",
    backgroundColor: "#fff5f5",
  },
  deleteText: { color: "#b91c1c", fontWeight: "800" },
  empty: { marginTop: 20, color: "#6b7280" },
});
