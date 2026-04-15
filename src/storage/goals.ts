// Goals storage module for HealthyLife.
// Handles persistence and retrieval of user-defined daily targets for calories and water.
import { StorageKeys } from "@/src/storage/keys";
import { scopedKey } from "@/src/storage/scoped";
import { getJSON, setJSON } from "@/src/storage/storage";

// Data model: defines the structure of user goal settings
export type Goals = {
  caloriesTarget: number;
  waterTargetMl: number;
};

// Default values: used when no goals have been saved yet
export const defaultGoals: Goals = {
  caloriesTarget: 2000,
  waterTargetMl: 2000,
};

// Data access: retrieves the user's saved goals or falls back to default values
export async function loadGoals(): Promise<Goals> {
  // Scoped key: ensures goals are stored per user session
  return getJSON<Goals>(await scopedKey(StorageKeys.goals), defaultGoals);
}

// Data access: saves updated goal values to persistent storage
export async function saveGoals(goals: Goals): Promise<void> {
  // Persistence: writes the provided goals object to storage
  return setJSON(await scopedKey(StorageKeys.goals), goals);
}
