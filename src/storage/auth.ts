import { getJSON, setJSON } from "@/src/storage/storage";
import { StorageKeys } from "@/src/storage/keys";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string; // demo-only, not secure
  createdAt: number;
};

type Session = { userId: string | null };

export async function loadUsers(): Promise<User[]> {
  return getJSON<User[]>(StorageKeys.users, []);
}

export async function saveUsers(users: User[]): Promise<void> {
  return setJSON(StorageKeys.users, users);
}

export async function getSession(): Promise<Session> {
  return getJSON<Session>(StorageKeys.session, { userId: null });
}

export async function setSession(userId: string | null): Promise<void> {
  return setJSON(StorageKeys.session, { userId });
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  if (!session.userId) return null;

  const users = await loadUsers();
  return users.find((u) => u.id === session.userId) ?? null;
}

export async function registerUser(params: {
  name: string;
  email: string;
  password: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const name = params.name.trim();
  const email = params.email.trim().toLowerCase();
  const password = params.password;

  if (!name) return { ok: false, error: "Name is required." };
  if (!email.includes("@")) return { ok: false, error: "Enter a valid email." };
  if (password.length < 4) return { ok: false, error: "Password must be at least 4 characters." };

  const users = await loadUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: "Email already exists. Please log in." };
  }

  const user: User = {
    id: String(Date.now()),
    name,
    email,
    password,
    createdAt: Date.now(),
  };

  const next = [user, ...users];
  await saveUsers(next);
  await setSession(user.id);

  return { ok: true };
}

export async function loginUser(params: {
  email: string;
  password: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const email = params.email.trim().toLowerCase();
  const password = params.password;

  const users = await loadUsers();
  const user = users.find((u) => u.email === email);

  if (!user) return { ok: false, error: "No account found for this email." };
  if (user.password !== password) return { ok: false, error: "Incorrect password." };

  await setSession(user.id);
  return { ok: true };
}

export async function logoutUser(): Promise<void> {
  await setSession(null);
}
