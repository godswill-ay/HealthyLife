import { getJSON, setJSON } from "@/src/storage/storage";
import { StorageKeys } from "@/src/storage/keys";
import { scopedKey } from "@/src/storage/scoped";

export type BmiRecord = {
  heightCm: number;
  weightKg: number;
  bmi: number;
  category: string;
  createdAt: number;
};

export async function loadLastBmi(): Promise<BmiRecord | null> {
  return getJSON<BmiRecord | null>(await scopedKey(StorageKeys.bmi), null);
}

export async function saveLastBmi(record: BmiRecord): Promise<void> {
  return setJSON(await scopedKey(StorageKeys.bmi), record);
}

export function calcBmi(heightCm: number, weightKg: number) {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category = "Normal";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  return { bmi, category };
}
