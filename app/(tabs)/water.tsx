import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { WaterLog, loadWater, saveWater } from "@/src/storage/water";

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function WaterScreen() {
  const [mlInput, setMlInput] = useState("");
  const [logs, setLogs] = useState<WaterLog[]>([]);
  const hydratedRef = useRef(false);

  useEffect(() => {
    (async () => {
      const saved = await loadWater();
      setLogs(saved);
      hydratedRef.current = true;
    })();
  }, []);

  const todayTotal = useMemo(() => {
    const now = new Date();
    return logs
      .filter((w) => isSameDay(new Date(w.createdAt), now))
      .reduce((sum, w) => sum + w.ml, 0);
  }, [logs]);

  async function addWater() {
    const n = Number(mlInput);
    if (!Number.isFinite(n) || n <= 0) return;

    const log: WaterLog = {
      id: String(Date.now()),
      ml: Math.round(n),
      createdAt: Date.now(),
    };

    const next = [log, ...logs];
    setLogs(next);
    setMlInput("");

    if (hydratedRef.current) await saveWater(next);
  }

  async function removeLog(id: string) {
    const next = logs.filter((w) => w.id !== id);
    setLogs(next);
    if (hydratedRef.current) await saveWater(next);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Water</Text>
      <Text style={styles.sub}>Today’s water: {todayTotal} ml</Text>

      <View style={styles.row}>
        <TextInput
          value={mlInput}
          onChangeText={setMlInput}
          placeholder="Milliliters (e.g. 250)"
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity onPress={addWater} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10, paddingTop: 12 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ gap: 4 }}>
              <Text style={styles.itemTitle}>{item.ml} ml</Text>
              <Text style={styles.itemMeta}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>

            <TouchableOpacity onPress={() => removeLog(item.id)} style={styles.delete}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No water logs yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "800", color: "#111827" },
  sub: { marginTop: 6, color: "#6b7280", fontWeight: "600" },
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
