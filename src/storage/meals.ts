// Meals storage module for HealthyLife.
// Handles persistence, retrieval, and aggregation of meal entries for calorie tracking.
import { StorageKeys } from "@/src/storage/keys";
import { scopedKey } from "@/src/storage/scoped";
import { getJSON, setJSON } from "@/src/storage/storage";

// Data model: defines the structure of a stored meal entry
export type Meal = {
  id: string;
  name: string;
  calories: number;
  createdAt: number;
};

// Utility function: compares two dates so meals can be grouped by calendar day
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// Data access: retrieves all saved meal entries for the current user
export async function loadMeals(): Promise<Meal[]> {
  return getJSON<Meal[]>(await scopedKey(StorageKeys.meals), []);
}

// Data access: saves updated meal entries to persistent storage
export async function saveMeals(meals: Meal[]): Promise<void> {
  return setJSON(await scopedKey(StorageKeys.meals), meals);
}

// Derived calculation: computes total calories consumed for the current day
export async function getTodayCaloriesTotal(): Promise<number> {
  // Load all stored meals for aggregation
  const meals = await loadMeals();
  // Current date: used to filter meals logged today
  const now = new Date();
  return (
    meals
      // Filter step: keep only meals created on the current day
      .filter((m) => isSameDay(new Date(m.createdAt), now))
      // Aggregation step: sum calorie values for today's meals
      .reduce((sum, m) => sum + m.calories, 0)
  );
}
