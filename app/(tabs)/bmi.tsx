import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { calcBmi, loadLastBmi, saveLastBmi } from "@/src/storage/bmi";

export default function BmiScreen() {
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);
  const [statusText, setStatusText] = useState<string>("");

  useEffect(() => {
    (async () => {
      const last = await loadLastBmi();
      if (!last) return;

      setHeightCm(String(last.heightCm));
      setWeightKg(String(last.weightKg));
      setResult({ bmi: last.bmi, category: last.category });
      setStatusText(
        `Last saved: ${last.bmi.toFixed(1)} (${last.category}) • ${new Date(last.createdAt).toLocaleString()}`
      );
    })();
  }, []);

  async function onCalculate() {
    const h = Number(heightCm);
    const w = Number(weightKg);

    if (!Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0) {
      setStatusText("Please enter valid height and weight.");
      return;
    }

    const { bmi, category } = calcBmi(h, w);
    const rounded = Math.round(bmi * 10) / 10;

    setResult({ bmi: rounded, category });

    await saveLastBmi({
      heightCm: h,
      weightKg: w,
      bmi: rounded,
      category,
      createdAt: Date.now(),
    });

    setStatusText(`Saved: ${rounded.toFixed(1)} (${category})`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>
      {statusText ? <Text style={styles.sub}>{statusText}</Text> : null}

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        value={heightCm}
        onChangeText={setHeightCm}
        placeholder="e.g. 175"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        value={weightKg}
        onChangeText={setWeightKg}
        placeholder="e.g. 70"
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity onPress={onCalculate} style={styles.button}>
        <Text style={styles.buttonText}>Calculate & Save</Text>
      </TouchableOpacity>

      {result ? (
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Your BMI</Text>
          <Text style={styles.bmiValue}>{result.bmi.toFixed(1)}</Text>
          <Text style={styles.category}>{result.category}</Text>
        </View>
      ) : (
        <Text style={styles.hint}>Enter your height and weight to calculate BMI.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff", gap: 10 },
  title: { fontSize: 24, fontWeight: "800", color: "#111827" },
  sub: { color: "#6b7280", fontWeight: "600" },
  label: { marginTop: 8, fontWeight: "700", color: "#111827" },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  button: {
    marginTop: 10,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#111827",
  },
  buttonText: { color: "#fff", fontWeight: "800", textAlign: "center" },
  card: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
    borderRadius: 14,
    padding: 14,
    gap: 6,
  },
  cardLabel: { color: "#6b7280", fontWeight: "700" },
  bmiValue: { fontSize: 36, fontWeight: "900", color: "#111827" },
  category: { fontSize: 18, fontWeight: "800", color: "#111827" },
  hint: { marginTop: 14, color: "#6b7280" },
});
