// Water storage module for HealthyLife.
// Handles persistence, retrieval, and aggregation of hydration data for the current user.

import { StorageKeys } from "@/src/storage/keys";
import { scopedKey } from "@/src/storage/scoped";
import { getJSON, setJSON } from "@/src/storage/storage";

// Data model: defines the structure of a stored water log entry
export type WaterLog = {
  id: string;
  ml: number;
  createdAt: number;
};

// Utility function: compares two dates so water logs can be grouped by calendar day
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// Data access: retrieves all saved water logs for the current user
export async function loadWater(): Promise<WaterLog[]> {
  return getJSON<WaterLog[]>(await scopedKey(StorageKeys.water), []);
}

// Data access: saves updated water logs to persistent storage
export async function saveWater(logs: WaterLog[]): Promise<void> {
  return setJSON(await scopedKey(StorageKeys.water), logs);
}

// Derived calculation: computes total water intake (ml) for the current day
export async function getTodayWaterTotalMl(): Promise<number> {
  // Load all stored water logs for aggregation
  const logs = await loadWater();
  // Current date: used to filter hydration entries for today
  const now = new Date();
  return (
    logs
      // Filter step: keep only water logs created on the current day
      .filter((w) => isSameDay(new Date(w.createdAt), now))
      // Aggregation step: sum milliliter values for today's entries
      .reduce((sum, w) => sum + w.ml, 0)
  );
}
