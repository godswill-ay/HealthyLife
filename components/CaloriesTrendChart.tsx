// Calories trend chart component for HealthyLife.
// Renders a 7-day rolling calorie trend using an SVG line chart for visual progress tracking.

import React, { useState } from "react";
import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Polyline } from "react-native-svg";

// Data model: defines the structure of each data point used in the chart
type Point = { label: string; value: number };

// Utility function: ensures a valid maximum value to avoid division errors in chart scaling
function maxOrOne(arr: number[]) {
  const m = Math.max(...arr);
  return m <= 0 ? 1 : m;
}

// Utility function: generates weekday labels for the last 7 days based on the current date
function getLast7DayLabels() {
  const today = new Date();

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i));

    return date.toLocaleDateString("en-GB", { weekday: "short" });
  });
}

// Main component: converts calorie data into visual coordinates and renders the trend chart UI
export default function CaloriesTrendChart({ data }: { data: Point[] }) {
  const [cardWidth, setCardWidth] = useState(0);

  // Derived labels: generate weekday names for the current rolling 7-day window.
  const dynamicLabels = getLast7DayLabels();

  const height = 220;
  const padding = 20;
  const horizontalCardPadding = 48; // 24 left + 24 right from styles.card
  const width = Math.max(cardWidth - horizontalCardPadding, 300);

  // Extract numeric values from dataset for scaling and rendering
  const values = data.map((d) => d.value);
  const maxV = maxOrOne(values);

  const formatCalories = (value: number) => `${value} kcal`;

  const handleCardLayout = (event: LayoutChangeEvent) => {
    const measuredWidth = event.nativeEvent.layout.width;
    if (measuredWidth > 0 && measuredWidth !== cardWidth) {
      setCardWidth(measuredWidth);
    }
  };

  // Compute usable drawing area by removing padding from total dimensions
  const usableW = width - padding * 2;
  const usableH = height - padding * 2;

  // Coordinate mapping: convert each data point into SVG x/y positions for the chart
  const pts = data.map((d, i) => {
    const x = padding + (usableW * i) / Math.max(1, data.length - 1);
    const y = padding + usableH - (usableH * d.value) / maxV;
    return { x, y };
  });

  // Path generation: combine all coordinate points into a single polyline string
  const poly = pts.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <View style={styles.card} onLayout={handleCardLayout}>
      <View style={styles.headerRow}>
        <View style={styles.headerTextBlock}>
          {/* Chart title: indicates the purpose of the visualised data */}
          <Text style={styles.title}>7-day Calories Trend</Text>
          {/* Chart description: explains what the data represents */}
          <Text style={styles.sub}>Daily total calories (last 7 days)</Text>
        </View>
      </View>

      {/* SVG chart: renders the calorie trend line and data points */}
      {cardWidth > 0 && (
        <Svg width={width} height={height}>
          <Polyline
            points={poly}
            fill="none"
            stroke="#111827"
            strokeWidth="3"
          />
          {pts.map((p, idx) => (
            <Circle key={idx} cx={p.x} cy={p.y} r="4" fill="#111827" />
          ))}
        </Svg>
      )}

      {/* X-axis labels: displays weekday names for the rolling 7-day period */}
      <View style={styles.labelsRow}>
        {data.map((d, idx) => (
          <Text key={`${d.label}-${idx}`} style={styles.label}>
            {dynamicLabels[idx] ?? d.label}
          </Text>
        ))}
      </View>

      {/* Daily calorie values: helps users match each trend point to the
          actual calorie total recorded on that date. */}
      <View style={styles.valuesRow}>
        {data.map((d, idx) => (
          <Text key={`value-${d.label}-${idx}`} style={styles.valueLabel}>
            {formatCalories(d.value)}
          </Text>
        ))}
      </View>
    </View>
  );
}

// Styles: controls layout, spacing, typography, and chart presentation
const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
    borderRadius: 14,
    padding: 24,
    gap: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  headerTextBlock: {
    flex: 1,
  },
  title: { fontSize: 18, fontWeight: "800", color: "#111827" },
  sub: { color: "#6b7280", fontWeight: "600", fontSize: 14, marginBottom: 10 },
  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },
  valuesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  valueLabel: {
    fontSize: 11,
    color: "#111827",
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },
});
