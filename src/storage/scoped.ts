// Scoped storage utility for HealthyLife.
// Ensures that stored data is associated with the currently authenticated user.
import { getSession } from "@/src/storage/auth";

// Utility function: generates a user-specific storage key to isolate data per session
export async function scopedKey(baseKey: string) {
  // Retrieve current session to determine active user ID
  const session = await getSession();
  // Extract user ID from session for key scoping
  const uid = session.userId;
  // Fallback: if no user is logged in, use the base key without scoping
  if (!uid) return baseKey;
  // Scoped key: append user ID to base key to create a unique per-user storage key
  return `${baseKey}::${uid}`;
}
