// BMI storage module for HealthyLife.
// Handles BMI calculation logic and persistence of the user's most recent BMI record.
import { StorageKeys } from "@/src/storage/keys";
import { scopedKey } from "@/src/storage/scoped";
import { getJSON, setJSON } from "@/src/storage/storage";

// Data model: defines the structure of a stored BMI record
export type BmiRecord = {
  heightCm: number;
  weightKg: number;
  bmi: number;
  category: string;
  createdAt: number;
};

// Data access: retrieves the most recently saved BMI record for the current user
export async function loadLastBmi(): Promise<BmiRecord | null> {
  return getJSON<BmiRecord | null>(await scopedKey(StorageKeys.bmi), null);
}

// Data access: saves the latest BMI record to persistent storage
export async function saveLastBmi(record: BmiRecord): Promise<void> {
  return setJSON(await scopedKey(StorageKeys.bmi), record);
}

// Utility function: calculates BMI value and determines the corresponding category
export function calcBmi(heightCm: number, weightKg: number) {
  // Convert height from centimeters to meters for BMI calculation
  const heightM = heightCm / 100;
  // BMI formula: weight (kg) divided by height (m) squared
  const bmi = weightKg / (heightM * heightM);

  // Default category: used as baseline before applying classification rules
  let category = "Normal";
  // Classification: determine BMI category based on standard health ranges
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  return { bmi, category };
}
