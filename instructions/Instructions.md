# Nudnik - Comprehensive Product Specification

## Overview
Nudnik is an innovative alarm clock app designed to challenge users to wake up fully by requiring them to complete interactive tasks before the alarm can be dismissed. This approach not only helps users combat the habit of hitting the snooze button but also encourages the formation of new habits, which is crucial for personal growth and development. By engaging users in tasks like solving math problems or scanning codes, Nudnik ensures that waking up becomes an active and engaging start to the day.

## Features

### 1. Alarm Management
**Multiple Alarms with Customization:**
Users can set multiple alarms with different sounds and tasks, allowing for varied wake-up experiences.
Date and Time: Select the alarm date and time using an intuitive date-time picker.
Task Configuration: Choose from predefined tasks or create custom tasks that must be completed to dismiss the alarm.
Save Alarm: Save configurations, which are then displayed on the Home Screen for easy management.
User Story:
As a user, I want to set multiple alarms with different sounds and tasks so that I can wake up in different ways each day.

### 2. Interactive Tasks
**Task Completion Requirement:**
Users must complete a specified task to dismiss the alarm, ensuring they are fully awake.
List of Task Types:
Math Calculation: Solve a math problem to turn off the alarm.
QR Code Scan: Scan a specific QR code, encouraging movement.
Bar Code Scan: Scan a barcode, suitable for tasks like verifying a daily medication.
User Story:
As a user, I want to complete a task before dismissing the alarm.

### 3. Progress Tracking
**Habit Formation Statistics:**
Track progress over time to see how consistently tasks are completed.
Visual representations of habits help motivate continued use.

### 4. User-Friendly Interface
**Intuitive Design:**
Simple and clean interface for easy navigation.
Visually engaging elements to enhance user experience.

### Wireframes
**Home Screen:**
Displays upcoming alarms and a summary of progress tracking.

**Alarm Setup:**
Allows setting alarms, choosing sounds, and selecting or creating tasks.

**Task Screen:**
Presents the task that needs to be completed to dismiss the alarm.

**Progress Screen:**
Shows detailed user progress and habit formation statistics through charts and graphs.

## Technical Specifications

**Platform:**
- Mobile (iOS and Android)
- Framework: React Native
- Development Tools: Expo
- Backend: Firebase (for authentication, data storage, and notifications)
- State Management: Context API
- Testing: Jest and React Native Testing Library

**Dependencies:**
- Expo Barcode Scanner: For QR and barcode scanning tasks.
- Expo Notifications API: For scheduling and handling alarm notifications.
- Programming Language: TypeScript (for type safety and better code quality)

## Project Setup and Folder Structure

**Setup**

1. Clone the repository from GitHub.
2. Install dependencies using `npx expo install`.
3. Start the development server using `npx expo start`.


To keep the project lean and maintainable, the following folder structure is proposed:

```bash
Nudnik/
├── app/                            # All pages/screens
│   ├── home-screen.tsx             # Home Screen
│   ├── alarm-setup-screen.tsx      # Alarm Setup Screen
│   ├── task-screen.tsx             # Task Screen
│   └── progress-screen.tsx         # Progress Tracking Screen
├── components/                     # Reusable components at the root
│   ├── alarm-item.tsx              # Component for displaying alarm items
│   ├── task-component.tsx          # Component for task rendering
│   └── progress-chart.tsx          # Component for displaying progress charts
├── assets/                         # Asset files (images, fonts, etc.)
│   ├── images/
│   └── fonts/
├── context/                        # Context API store
│   └── app-context.tsx             # Global state management
├── navigation/                     # Navigation configuration
│   └── app-navigator.tsx           # Navigation setup
├── utils/                          # Utility functions
│   ├── notifications.ts            # Notification scheduling and handling
│   └── permissions.ts              # Permission requests and handling
├── App.tsx                         # Main application component
├── package.json                    # Project dependencies
├── tsconfig.json                   # TypeScript configuration
├── README.md                       # Project documentation
```

## File Naming and Placement

**Components:**
All reusable components are located in /components at the root level.
Named using kebab-case like example-component.tsx.

**Pages:**
All new pages/screens are placed in /app.

**Lean Structure:**
The structure avoids unnecessary files and folders, keeping the project lean.

## Dependencies and SDK Versions

Ensure that the latest API and SDK versions are used for optimal performance and up-to-date features. Include the following in your package.json:

```json
{
  "dependencies": {
    "expo": "latest",
    "react": "latest",
    "react-native": "latest",
    "expo-barcode-scanner": "latest",
    "expo-notifications": "latest",
    "expo-navigation": "latest",
    "firebase": "latest",
    "typescript": "latest"
  },
  "devDependencies": {
    "jest": "latest",
    "@testing-library/react-native": "latest",
    "eslint": "latest",
    "prettier": "latest"
  }
}
```

## Implementation Details

**Expo Barcode Scanner**
Usage:
Utilize expo-barcode-scanner for QR code and barcode scanning tasks.

Permissions:
Implement permission handling in permissions.ts to request camera access.

Integration:
The task-component.tsx will include the scanning functionality when a scan task is required.

**Expo Notifications API**

**Scheduling Alarms:**
Use expo-notifications to schedule alarms as notifications.

Handling Notifications:
Direct users to the task-screen.tsx when a notification (alarm) is interacted with.

Permissions:
Request notification permissions upon app initialization or alarm setup.

## Testing

**Unit Tests:**
Write tests using Jest and React Native Testing Library for components and screens.

**Type Checking:**
Use TypeScript to enforce type safety and reduce runtime errors.

## Best Practices
**Coding in React Native and Expo**

**Component-Based Architecture:**

Break down the UI into reusable components for maintainability.

**State Management:**

Use Context API for global state management to simplify data flow.

**Expo Navigation:**

Use Expo Navigation for seamless transitions between screens.

**Styling:**

Implement consistent styling using StyleSheet.
Avoid inline styles to keep code clean.

**Navigation:**

Use React Navigation for seamless transitions between screens.

**Testing:**

Write unit tests to catch issues early and ensure components work as expected.

**Code Quality:**

Use ESLint and Prettier for code formatting and linting.

**Performance Optimization:**

Optimize asset sizes (images, fonts).
Implement lazy loading where appropriate.
Avoid unnecessary re-renders with proper state management.

**Documentation:**

Maintain clear and concise documentation in code comments and README.md.

**Error Handling and Logging**

**Centralized Error Handling:**

Implement a global error handler to catch exceptions.

**Error Boundaries:**

Use React Error Boundaries to display fallback UI in case of errors.

**Try-Catch Blocks:**

Handle exceptions in asynchronous code using try-catch.

**User-Friendly Error Messages:**

Display clear messages to users without exposing technical details.

**Logging:**

Integrate with services like Sentry or Firebase Crashlytics for error tracking.

**Network Error Handling:**

Provide feedback and retry options when network requests fail.

**Validation:**

Validate user inputs and API responses to prevent errors.

**Graceful Degradation:**

Ensure the app remains functional even if some features fail.

**Type Safety**

**TypeScript:**

Enforce type safety across the project.

**Type Definitions:**

Maintain type definitions for components, props, and state.

**Third-Party Libraries:**

Ensure type definitions are included for all dependencies.

**Strict Mode:**

Enable strict mode in tsconfig.json to catch potential issues early.

## Additional Requirements

**User Experience Enhancements:**

Customizable Alarm Sounds: Allow users to select or upload custom alarm sounds.
Snooze Options: Provide limited snooze options with increasing task difficulty.

**Accessibility:**

Ensure all features are accessible, following best practices for inclusive design.

**Data Privacy:**

Clearly communicate data usage policies to users.
Implement secure authentication and data handling practices.

**Internationalization:**

Prepare the app for multiple languages and locales.

**Documentation and Context**

Include all the provided documentation and context within the project repository to assist developers:

**Code Examples and Responses:**

Add code snippets and examples within README.md or dedicated documentation files.
Include responses and explanations from previous discussions as references.

**Setup and Installation Guides:**

Provide detailed instructions for setting up the development environment.
Explain how to run the app locally and execute tests.

**API References:**

Link to official documentation for all external APIs and libraries used.
