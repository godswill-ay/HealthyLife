// Stats utility file for HealthyLife.
// Responsible for generating aggregated data (e.g., calorie trends)
// used by charts and dashboard components.
import { loadMeals } from "@/src/storage/meals";

// Normalises a Date object to the start of the day (midnight).
// This ensures consistent comparisons when grouping data by date.
function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// Compares two Date objects and checks if they represent the same calendar day.
// Used to group meals that were logged on the same day.
function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// getLast7DaysCalories:
// 1. Loads all stored meals
// 2. Builds a rolling 7-day window ending today
// 3. Calculates total calories for each day
// 4. Returns structured data for chart rendering
export async function getLast7DaysCalories() {
  // Retrieve all stored meal entries from local storage
  const meals = await loadMeals();

  // Get today's date normalised to midnight for accurate comparisons
  const today = startOfDay(new Date());

  // Generate an array of the last 7 days (oldest to newest)
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    // Offset the date to go back 6 days up to today
    d.setDate(today.getDate() - (6 - i)); // oldest -> newest
    return d;
  });

  // For each day, calculate the total calories logged
  const totals = days.map((day) => {
    const total = meals
      // Keep only meals that were created on the current day
      .filter((m) => sameDay(new Date(m.createdAt), day))
      // Sum all calories for the filtered meals
      .reduce((sum, m) => sum + m.calories, 0);

    // Format the day label (e.g., Mon, Tue) for chart display
    const label = day.toLocaleDateString(undefined, { weekday: "short" });
    return { label, value: total };
  });

  // Return array of { label, value } objects for the chart component
  return totals;
}
