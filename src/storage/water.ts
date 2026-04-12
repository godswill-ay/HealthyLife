import { getJSON, setJSON } from "@/src/storage/storage";
import { StorageKeys } from "@/src/storage/keys";
import { scopedKey } from "@/src/storage/scoped";

export type WaterLog = {
  id: string;
  ml: number;
  createdAt: number;
};

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export async function loadWater(): Promise<WaterLog[]> {
  return getJSON<WaterLog[]>(await scopedKey(StorageKeys.water), []);
}

export async function saveWater(logs: WaterLog[]): Promise<void> {
  return setJSON(await scopedKey(StorageKeys.water), logs);
}

export async function getTodayWaterTotalMl(): Promise<number> {
  const logs = await loadWater();
  const now = new Date();
  return logs
    .filter((w) => isSameDay(new Date(w.createdAt), now))
    .reduce((sum, w) => sum + w.ml, 0);
}
