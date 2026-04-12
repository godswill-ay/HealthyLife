import { getJSON, setJSON } from "@/src/storage/storage";
import { StorageKeys } from "@/src/storage/keys";
import { scopedKey } from "@/src/storage/scoped";

export type Meal = {
  id: string;
  name: string;
  calories: number;
  createdAt: number;
};

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export async function loadMeals(): Promise<Meal[]> {
  return getJSON<Meal[]>(await scopedKey(StorageKeys.meals), []);
}

export async function saveMeals(meals: Meal[]): Promise<void> {
  return setJSON(await scopedKey(StorageKeys.meals), meals);
}

export async function getTodayCaloriesTotal(): Promise<number> {
  const meals = await loadMeals();
  const now = new Date();
  return meals
    .filter((m) => isSameDay(new Date(m.createdAt), now))
    .reduce((sum, m) => sum + m.calories, 0);
}
