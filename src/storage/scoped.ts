import { getSession } from "@/src/storage/auth";

export async function scopedKey(baseKey: string) {
  const session = await getSession();
  const uid = session.userId;
  if (!uid) return baseKey;
  return `${baseKey}::${uid}`;
}
