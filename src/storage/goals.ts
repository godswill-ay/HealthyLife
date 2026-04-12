import { getJSON, setJSON } from "@/src/storage/storage";
import { StorageKeys } from "@/src/storage/keys";
import { scopedKey } from "@/src/storage/scoped";

export type Goals = {
  caloriesTarget: number;
  waterTargetMl: number;
};

export const defaultGoals: Goals = {
  caloriesTarget: 2000,
  waterTargetMl: 2000,
};

export async function loadGoals(): Promise<Goals> {
  return getJSON<Goals>(await scopedKey(StorageKeys.goals), defaultGoals);
}

export async function saveGoals(goals: Goals): Promise<void> {
  return setJSON(await scopedKey(StorageKeys.goals), goals);
}
