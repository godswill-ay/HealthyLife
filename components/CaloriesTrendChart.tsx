import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Polyline, Circle } from "react-native-svg";

type Point = { label: string; value: number };

function maxOrOne(arr: number[]) {
  const m = Math.max(...arr);
  return m <= 0 ? 1 : m;
}

export default function CaloriesTrendChart({ data }: { data: Point[] }) {
  const width = 320;
  const height = 140;
  const padding = 16;

  const values = data.map((d) => d.value);
  const maxV = maxOrOne(values);

  const usableW = width - padding * 2;
  const usableH = height - padding * 2;

  const pts = data.map((d, i) => {
    const x = padding + (usableW * i) / Math.max(1, data.length - 1);
    const y = padding + usableH - (usableH * d.value) / maxV;
    return { x, y };
  });

  const poly = pts.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <View style={styles.card}>
      <Text style={styles.title}>7-day Calories Trend</Text>
      <Text style={styles.sub}>Daily total calories (last 7 days)</Text>

      <Svg width={width} height={height}>
        <Polyline points={poly} fill="none" stroke="#111827" strokeWidth="3" />
        {pts.map((p, idx) => (
          <Circle key={idx} cx={p.x} cy={p.y} r="4" fill="#111827" />
        ))}
      </Svg>

      <View style={styles.labelsRow}>
        {data.map((d) => (
          <Text key={d.label} style={styles.label}>{d.label}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
    borderRadius: 14,
    padding: 14,
    gap: 6,
  },
  title: { fontSize: 16, fontWeight: "800", color: "#111827" },
  sub: { color: "#6b7280", fontWeight: "600", marginBottom: 6 },
  labelsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
  label: { fontSize: 11, color: "#6b7280", fontWeight: "700" },
});
