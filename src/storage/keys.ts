// Storage keys module for HealthyLife.
// Defines unique identifiers used to store and retrieve different data types in local storage.

// Key mapping: centralises all storage keys to ensure consistency and avoid duplication across the application
export const StorageKeys = {
  meals: "healthylife.meals.v1", // Stores all logged meal entries for calorie tracking
  water: "healthylife.water.v1", // Stores water intake logs for hydration tracking
  bmi: "healthylife.bmi.v1", // Stores the latest BMI record for the user
  goals: "healthylife.goals.v1", // Stores user-defined daily calorie and water targets
  users: "healthylife.users.v1", // Stores all registered user accounts
  session: "healthylife.session.v1", // Stores the current authenticated session (active user ID)
} as const;
