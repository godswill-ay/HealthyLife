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

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function MealsScreen() {
  const [nameInput, setNameInput] = useState("");
  const [caloriesInput, setCaloriesInput] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const hydratedRef = useRef(false);

  useEffect(() => {
    (async () => {
      const saved = await loadMeals();
      setMeals(saved);
      hydratedRef.current = true;
    })();
  }, []);

  const todayTotal = useMemo(() => {
    const now = new Date();
    return meals
      .filter((m) => isSameDay(new Date(m.createdAt), now))
      .reduce((sum, m) => sum + m.calories, 0);
  }, [meals]);

  async function addMeal() {
    const n = Number(caloriesInput);
    const name = nameInput.trim();

    if (!name) return;
    if (!Number.isFinite(n) || n <= 0) return;

    const meal: Meal = {
      id: String(Date.now()),
      name,
      calories: Math.round(n),
      createdAt: Date.now(),
    };

    const next = [meal, ...meals];
    setMeals(next);
    setNameInput("");
    setCaloriesInput("");

    if (hydratedRef.current) await saveMeals(next);
  }

  async function removeMeal(id: string) {
    const next = meals.filter((m) => m.id !== id);
    setMeals(next);
    if (hydratedRef.current) await saveMeals(next);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meals</Text>
      <Text style={styles.sub}>Today’s calories: {todayTotal}</Text>

      <View style={styles.row}>
        <TextInput
          value={nameInput}
          onChangeText={setNameInput}
          placeholder="Food name (e.g. Chicken wrap)"
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <TextInput
          value={caloriesInput}
          onChangeText={setCaloriesInput}
          placeholder="Calories (e.g. 450)"
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity onPress={addMeal} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10, paddingTop: 12 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ gap: 4, flex: 1 }}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemMeta}>
                {item.calories} cal • {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>

            <TouchableOpacity onPress={() => removeMeal(item.id)} style={styles.delete}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No meals yet. Add your first one.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "800", color: "#111827" },
  sub: { marginTop: 6, color: "#6b7280", fontWeight: "600" },
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
