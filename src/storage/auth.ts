// Authentication storage module for HealthyLife.
// Handles user registration, login, session management, and user retrieval using local storage.

import { StorageKeys } from "@/src/storage/keys";
import { getJSON, setJSON } from "@/src/storage/storage";

// User model: defines the structure of a stored user account
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: number;
};

// Session model: stores the currently logged-in user's ID
type Session = { userId: string | null };

// Data access: retrieves all registered users from storage
export async function loadUsers(): Promise<User[]> {
  return getJSON<User[]>(StorageKeys.users, []);
}

// Data access: saves updated user list to persistent storage
export async function saveUsers(users: User[]): Promise<void> {
  return setJSON(StorageKeys.users, users);
}

// Session access: retrieves the current authentication session
export async function getSession(): Promise<Session> {
  return getJSON<Session>(StorageKeys.session, { userId: null });
}

// Session update: sets or clears the active user session
export async function setSession(userId: string | null): Promise<void> {
  return setJSON(StorageKeys.session, { userId });
}

// Helper function: returns the currently authenticated user based on session data
export async function getCurrentUser(): Promise<User | null> {
  // Retrieve current session to determine active user
  const session = await getSession();
  // Return null if no user is logged in
  if (!session.userId) return null;

  // Load all users to find the matching session user
  const users = await loadUsers();
  return users.find((u) => u.id === session.userId) ?? null;
}

// Action handler: validates input, creates a new user account, and starts a session
export async function registerUser(params: {
  name: string;
  email: string;
  password: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  // Input processing: clean and normalize user input values
  const name = params.name.trim();
  const email = params.email.trim().toLowerCase();
  const password = params.password;

  // Validation: ensure required fields meet basic criteria
  if (!name) return { ok: false, error: "Name is required." };
  if (!email.includes("@")) return { ok: false, error: "Enter a valid email." };
  if (password.length < 4)
    return { ok: false, error: "Password must be at least 4 characters." };

  // Load existing users to check for duplicates
  const users = await loadUsers();
  // Duplicate check: prevent multiple accounts with the same email
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: "Email already exists. Please log in." };
  }

  // Create new user object with unique ID and timestamp
  const user: User = {
    id: String(Date.now()),
    name,
    email,
    password,
    createdAt: Date.now(),
  };

  // Insert new user at the beginning of the list
  const next = [user, ...users];
  // Persist updated user list
  await saveUsers(next);
  // Start session immediately after successful registration
  await setSession(user.id);

  return { ok: true };
}

// Action handler: authenticates user credentials and establishes a session
export async function loginUser(params: {
  email: string;
  password: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  // Input processing: normalize email for consistent comparison
  const email = params.email.trim().toLowerCase();
  const password = params.password;

  // Load all users to find matching account
  const users = await loadUsers();
  // Lookup: find user with matching email
  const user = users.find((u) => u.email === email);

  // Validation: return error if account does not exist
  if (!user) return { ok: false, error: "No account found for this email." };
  // Validation: ensure provided password matches stored password
  if (user.password !== password)
    return { ok: false, error: "Incorrect password." };

  // Session start: store logged-in user ID
  await setSession(user.id);
  return { ok: true };
}

// Action handler: clears the current session to log the user out
export async function logoutUser(): Promise<void> {
  // Session clear: remove active user ID from storage
  await setSession(null);
}
