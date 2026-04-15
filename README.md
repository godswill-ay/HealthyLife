# HealthyLife – Fitness Tracking Application

**Final Year Project** – A cross-platform fitness tracking application developed as part of a **BSc Computer Science Final Year Project**, focusing on usability, data persistence, and health metric visualisation.

![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![Web](https://img.shields.io/badge/Web-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)

---

## 🎯 Project Overview

- **Project Type:** Final Year Individual Project
- **Domain:** Health & Fitness Tracking
- **Objective:** Design and implement a functional prototype that enables users to track daily health metrics
- **Approach:** Web-focused implementation using a cross-platform framework (React Native with Expo)

HealthyLife demonstrates practical application of **cross-platform development, state management, local data persistence, and user interface design**, rather than production-scale deployment.

---

## 🚀 Key Features

### User Authentication

- User registration and login
- Local/demo authentication
- Per-user data isolation
- Personalised greeting on dashboard

### Dashboard

- Daily calorie summary with progress indicator
- Daily water intake summary with progress indicator
- BMI status display
- Editable daily goals (calories and water)
- 7-day calorie trend visualisation

### Meals Tracking

- Log meals with food name and calorie value
- View total daily calorie intake
- Delete meal entries

### Water Tracking

- Log water intake in millilitres
- View daily water total
- Delete water entries

### BMI Calculator

- Calculate BMI using height and weight
- Display BMI value and category
- Persist last calculated BMI result

### Navigation

- Bottom tab navigation:
  - Dashboard
  - Meals
  - Water
  - BMI
  - Explore
  - Logout

---

## 🏗 Technical Architecture

### Application Layer

- **Framework:** React Native with Expo
- **Routing:** Expo Router (file-based routing)
- **Language:** TypeScript

### Data Layer

- **Storage:** AsyncStorage
- **Persistence:** Local device storage per user
- **No external backend** (prototype-focused)

### UI & UX

- Responsive layout for mobile and web
- Consistent component-based design
- Expo Vector Icons for navigation and UI elements

---

## 🛠 Technology Stack

- React Native
- Expo
- Expo Router
- TypeScript
- AsyncStorage (local persistence)
- Expo Vector Icons
- EAS Build (Android APK generation)
- Vercel (Web deployment)

---

## 📱 Supported Platforms

- Android (APK generated via EAS Build)
- Web (Expo Web deployed on Vercel)
- iOS not built due to Apple Developer account requirements

---

## 📽 Prototype Demonstration

A prototype demonstration video accompanies this submission and showcases:

- User authentication flow
- Core application features
- Dashboard and data tracking
- Navigation and UI interaction
- Android emulator usage

---

## ⚠️ Limitations

- No cloud backend (local storage only)
- No external food database (manual calorie entry)
- Authentication is for demonstration purposes
- Not intended for medical or clinical use

---

## 🎓 Academic Context

This project was developed as part of a **Computer Science Final Year Project**.

Key learning outcomes include:

- Cross-platform mobile development
- UI/UX design considerations
- State management and persistence
- Data modelling for user-based systems
- Deployment of functional prototypes

---

## 👤 Author

**Godswill (AY)**  
BSc Computer Science – Final Year Project  
2026

---

## 📄 License

This project is submitted for academic assessment purposes only.

# HealthyLife – Personal Health Tracking Application

**Final Year Project (BSc Computer Science)**  
HealthyLife is a web-focused health tracking application designed to help users monitor key daily wellness metrics such as calories, water intake, and BMI in a simple and accessible way.

---

## 🎯 Project Overview

HealthyLife was developed as a final year project to demonstrate practical software engineering skills, including user interface design, state management, and data persistence.

The application focuses on **usability and simplicity**, allowing users to track their health data without unnecessary complexity or external dependencies.

### Key Objectives

- Provide an intuitive interface for daily health tracking
- Ensure consistent user experience across web and mobile views
- Implement persistent user-specific data storage
- Visualise health trends to support better decision-making

---

## 🚀 Core Features

### 🔐 Authentication

- User registration and login system
- Per-user data isolation using local storage
- Immediate access to dashboard after account creation

### 📊 Dashboard

- Daily calorie tracking with progress bar
- Daily water intake tracking with progress bar
- BMI status display with category (e.g. Normal)
- Editable daily goals (calories and water)
- 7-day calorie trend chart (dynamic based on current date)

### 🍽 Meals Tracking

- Add meals with calorie values
- View total calories consumed per day
- Delete individual meal entries

### 💧 Water Tracking

- Log water intake in millilitres
- Track daily hydration progress
- Remove logged entries

### ⚖️ BMI Calculator

- Calculate BMI using height and weight
- Display BMI category (Underweight, Normal, Overweight, etc.)
- Persist last calculated result for continuity

### 🧭 Navigation

- Tab-based navigation system:
  - Dashboard
  - Meals
  - Water
  - BMI
  - Explore
  - Logout

---

## 🧠 Design Approach

This project was intentionally designed as a **web-first application**, despite initially exploring a mobile-first approach.

### Key Decisions

- Focus shifted to web for better demonstration and stability
- Local storage used instead of backend to reduce complexity
- Clean and consistent UI prioritised over feature overload
- Modular component structure for maintainability

---

## 🏗 Technical Architecture

### Frontend

- React Native (Expo)
- Expo Router (file-based routing)
- TypeScript

### Data Layer

- AsyncStorage for local persistence
- Scoped data per authenticated user

### UI & UX

- Responsive layout for desktop and mobile
- Reusable component-based structure
- Consistent styling across screens

---

## 🛠 Technology Stack

- React Native
- Expo
- Expo Router
- TypeScript
- AsyncStorage
- Expo Vector Icons
- Vercel (web deployment)

---

## 📱 Platform Support

- Web (Primary platform – deployed via Vercel)
- Android (Prototype APK via Expo/EAS)
- iOS not included due to Apple Developer restrictions

---

## 📁 Project Structure (Simplified)

- `app/` – Main application screens and routing
- `components/` – Reusable UI components
- `src/storage/` – Data handling and persistence logic
- `hooks/` – Custom React hooks
- `constants/` – Shared styles and configuration

---

## ⚠️ Limitations

- No backend or cloud database (local storage only)
- No external food database integration
- Authentication is simplified for demonstration
- Not intended for medical or professional health use

---

## 🎓 Academic Context

This project was developed as part of a **BSc Computer Science Final Year Project**, focusing on:

- Software architecture and design
- Cross-platform development principles
- Data persistence and state management
- User-centred interface design

---

## 👤 Author

**Godswill Ayogu**  
BSc Computer Science – Final Year Project  
2026

---

## 📄 License

This project is intended for academic submission and demonstration purposes only.
