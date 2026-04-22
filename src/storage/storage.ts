// Generic storage utility for HealthyLife.
// Provides reusable helper functions for saving and retrieving JSON data using AsyncStorage.
import AsyncStorage from "@react-native-async-storage/async-storage";

// Data write: serialises a JavaScript object into JSON and stores it using a given key
export async function setJSON<T>(key: string, value: T): Promise<void> {
  // Serialization: convert value to JSON string before storing in AsyncStorage
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

// Data read: retrieves and parses JSON data from storage with a safe fallback
export async function getJSON<T>(key: string, fallback: T): Promise<T> {
  // Retrieval: fetch raw string data from AsyncStorage using the provided key
  const raw = await AsyncStorage.getItem(key);
  // Fallback: return default value if no data exists for the key
  if (!raw) return fallback;
  try {
    // Deserialization: convert stored JSON string back into JavaScript object
    return JSON.parse(raw) as T;
  } catch {
    // Error handling: return fallback if stored data is corrupted or invalid JSON
    return fallback;
  }
}

// ==========================
// User Profile Help
// ==========================

export const USER_PROFILE_KEY = "userProfile";

export type UserProfile = {
  name: string;
  email: string;
};

// Get user profile
export async function getUserProfile(): Promise<UserProfile | null> {
  return getJSON<UserProfile | null>(USER_PROFILE_KEY, null);
}

// Set user profile (overwrite)
export async function setUserProfile(profile: UserProfile): Promise<void> {
  await setJSON(USER_PROFILE_KEY, profile);
}

// Update user profile (merge)
export async function updateUserProfile(
  patch: Partial<UserProfile>,
): Promise<UserProfile | null> {
  const current = await getUserProfile();

  if (!current) return null;

  const updated = { ...current, ...patch };
  await setUserProfile(updated);

  return updated;
}
