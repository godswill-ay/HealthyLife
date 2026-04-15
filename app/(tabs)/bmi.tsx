// BMI screen for HealthyLife.
// Handles user input, BMI calculation, and persistence of last result.

import { calcBmi, loadLastBmi, saveLastBmi } from "@/src/storage/bmi";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Main screen component: manages BMI state, calculations, and UI rendering
export default function BmiScreen() {
  // Form state: stores user inputs and calculated BMI result
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
  } | null>(null);
  const [statusText, setStatusText] = useState<string>("");

  // Effect: loads last saved BMI record from storage on component mount
  useEffect(() => {
    (async () => {
      // Retrieve last stored BMI data (if available)
      const last = await loadLastBmi();
      // Exit if no previous BMI record exists
      if (!last) return;

      // Restore previous height and weight inputs
      setHeightCm(String(last.heightCm));
      // Restore previously calculated BMI result
      setResult({ bmi: last.bmi, category: last.category });
      // Display last saved BMI summary with timestamp
      setStatusText(
        `Last saved: ${last.bmi.toFixed(1)} (${last.category}) • ${new Date(last.createdAt).toLocaleString()}`,
      );
    })();
  }, []);

  // Action handler: validates input, calculates BMI, and saves result
  async function onCalculate() {
    // Convert height and weight inputs to numeric values
    const h = Number(heightCm);
    const w = Number(weightKg);

    // Validate inputs to ensure valid positive numeric values
    if (!Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0) {
      setStatusText("Please enter valid height and weight.");
      return;
    }

    // Perform BMI calculation using utility function
    const { bmi, category } = calcBmi(h, w);
    // Round BMI value to one decimal place for display
    const rounded = Math.round(bmi * 10) / 10;

    // Update state with calculated BMI result
    setResult({ bmi: rounded, category });

    // Persist BMI result for future sessions
    await saveLastBmi({
      heightCm: h,
      weightKg: w,
      bmi: rounded,
      category,
      createdAt: Date.now(),
    });

    // Update status text to confirm save action
    setStatusText(`Saved: ${rounded.toFixed(1)} (${category})`);
  }

  return (
    <View style={styles.container}>
      {/* Container: wraps entire BMI calculator layout */}
      {/* Title: indicates current screen purpose */}
      <Text style={styles.title}>BMI Calculator</Text>
      {/* Status: displays last saved result or validation messages */}
      {statusText ? <Text style={styles.sub}>{statusText}</Text> : null}

      {/* Input: captures user height in centimeters */}
      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        value={heightCm}
        onChangeText={setHeightCm}
        placeholder="e.g. 175"
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Input: captures user weight in kilograms */}
      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        value={weightKg}
        onChangeText={setWeightKg}
        placeholder="e.g. 70"
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Action button: triggers BMI calculation and save */}
      <TouchableOpacity onPress={onCalculate} style={styles.button}>
        <Text style={styles.buttonText}>Calculate & Save</Text>
      </TouchableOpacity>

      {/* Result display: shows calculated BMI and category */}
      {result ? (
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Your BMI</Text>
          <Text style={styles.bmiValue}>{result.bmi.toFixed(1)}</Text>
          <Text style={styles.category}>{result.category}</Text>
        </View>
      ) : (
        // Hint: prompts user to enter inputs if no result is available
        <Text style={styles.hint}>
          Enter your height and weight to calculate BMI.
        </Text>
      )}
    </View>
  );
}

// Styles for BMI screen layout, inputs, and result display
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
