import { loadMeals } from "@/src/storage/meals";

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export async function getLast7DaysCalories() {
  const meals = await loadMeals();
  const today = startOfDay(new Date());

  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i)); // oldest -> newest
    return d;
  });

  const totals = days.map((day) => {
    const total = meals
      .filter((m) => sameDay(new Date(m.createdAt), day))
      .reduce((sum, m) => sum + m.calories, 0);

    const label = day.toLocaleDateString(undefined, { weekday: "short" });
    return { label, value: total };
  });

  return totals;
}
