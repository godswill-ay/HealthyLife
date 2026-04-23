import { WaterLog, loadWater, saveWater } from "@/src/storage/water";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Utility function: compares two dates so water logs can be grouped by calendar day
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// Main screen component: manages water tracking data, user input, and hydration UI
export default function WaterScreen() {
  // Form state: stores water input and saved hydration log entries
  const [mlInput, setMlInput] = useState("");
  const [logs, setLogs] = useState<WaterLog[]>([]);
  const [msg, setMsg] = useState("");
  const hydratedRef = useRef(false);

  useEffect(() => {
    // Effect loads saved water logs when the screen is opened
    (async () => {
      const saved = await loadWater();
      setLogs(saved);
      hydratedRef.current = true;
    })();
  }, []);

  // Derived state: calculates today's total water intake from saved log entries
  const todayTotal = useMemo(() => {
    // Current date: used to filter hydration entries for today only
    const now = new Date();
    return (
      logs
        // Filter step: keep only water logs created on the current day
        .filter((w) => isSameDay(new Date(w.createdAt), now))
        // Aggregation step: sum milliliter values for today's entries
        .reduce((sum, w) => sum + w.ml, 0)
    );
  }, [logs]);

  // creates a new water log and persists the updated hydration list
  async function addWater() {
    // Input parsing: convert the text field value into a numeric milliliter amount
    const n = Number(mlInput);
    // Validation: reject invalid, empty, or non-positive values with visible feedback
    if (!mlInput.trim()) {
      setMsg("Please enter a water amount.");
      return;
    }

    if (!Number.isFinite(n) || n <= 0) {
      setMsg("Please enter a valid water amount greater than 0.");
      return;
    }

    // create a water log object with ID, amount, and timestamp
    const log: WaterLog = {
      id: String(Date.now()),
      ml: Math.round(n),
      createdAt: Date.now(),
    };

    // place newest water entry at the top of the list
    const next = [log, ...logs];
    setLogs(next);
    setMlInput("");
    setMsg("");

    // save updated logs after initial hydration data has loaded
    if (hydratedRef.current) await saveWater(next);
  }

  //removes a selected water log and persists the updated list
  async function removeLog(id: string) {
    // remove the selected hydration entry by its unique ID
    const next = logs.filter((w) => w.id !== id);
    setLogs(next);
    // Persistence: save the reduced list after deletion
    if (hydratedRef.current) await saveWater(next);
  }

  return (
    <View style={styles.container}>
      {/* Screen layout: wraps all water tracking content on this page */}
      {/* Screen title: identifies the current hydration tracking page */}
      <Text style={styles.title}>Water</Text>
      {/* Daily summary: shows the total amount of water consumed today */}
      <Text style={styles.sub}>Today’s water: {todayTotal} ml</Text>
      {msg ? <Text style={styles.error}>{msg}</Text> : null}

      {/* Input section: allows the user to enter a water amount and save it */}
      <View style={styles.row}>
        <TextInput
          value={mlInput}
          onChangeText={(text) => {
            setMlInput(text);
            if (msg) setMsg("");
          }}
          placeholder="Milliliters (e.g. 250)"
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity onPress={addWater} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Log list: displays all saved water entries with newest items first */}
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10, paddingTop: 12 }}
        renderItem={({ item }) => (
          <>
            {/* Log item: displays one saved water entry with timestamp and actions */}
            <View style={styles.item}>
              <View style={{ gap: 4 }}>
                <Text style={styles.itemTitle}>{item.ml} ml</Text>
                <Text style={styles.itemMeta}>
                  {new Date(item.createdAt).toLocaleString()}
                </Text>
              </View>
              {/* Delete action: removes the selected water entry from the log */}
              <TouchableOpacity
                onPress={() => removeLog(item.id)}
                style={styles.delete}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        // Empty state: shown when no hydration entries have been added yet
        ListEmptyComponent={
          <Text style={styles.empty}>No water logs yet.</Text>
        }
      />
    </View>
  );
}

// Styles: controls layout, spacing, typography, and list appearance for the water screen
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "800", color: "#111827" },
  sub: { marginTop: 6, color: "#6b7280", fontWeight: "600" },
  error: { marginTop: 8, color: "#b91c1c", fontWeight: "600" },
  row: { flexDirection: "row", gap: 10, marginTop: 14 },
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
  },
  itemTitle: { fontSize: 18, fontWeight: "800", color: "#111827" },
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
