# Nudnik - Product Specification

## Overview
Nudnik is an innovative alarm clock app designed to challenge users to wake up fully by requiring them to complete interactive tasks before the alarm can be dismissed. 
This helps users combat the habit of hitting the snooze button and ensures they wake up for the day. The ability to form new habits is crucial for personal growth and development. 
Nudnik capitalizes on this ability by challenging users to complete engaging tasks before dismissing the alarm. This approach encourages users to cultivate a habit of actually completing tasks (e.g., taking a daily pill).

## Features
1. See a list of alarms and add a new alarm button
    - **As a user, I want to set multiple alarms with different sounds and tasks so that I can wake up in different ways each day.**
        - **Date and Time**: The user selects the date and time for the alarm using a date-time picker.
        - **Task Configuration**: The user chooses a task from a predefined list or creates a custom task that needs to be completed to dismiss the alarm.
        - **Save Alarm**: The user saves the alarm configuration, which is then displayed on the Home Screen.
2. **Interactive Tasks**: Users must complete tasks to dismiss the alarm.
    - **As a user, I want to complete a task before dismissing the alarm**
    - **List of task types:**
        - **Math Calculation**: The user needs to solve a math calculation.
        - **QR Code Scan**: The user needs to scan a QR code.
        - **Bar Code Scan**: The user needs to scan a bar code.
3. **User-Friendly Interface**: Simple and intuitive design for easy navigation.

## Technical Specifications
- **Platform**: Mobile (iOS and Android)
- **Framework**: React Native
- **Development Tools**: Expo
- **Backend**: Firebase (for authentication, data storage, and notifications)
- **State Management**: Context API
- **Testing**: Jest and React Native Testing Library

## User Stories
2. **As a user, I want to complete a task before dismissing the alarm**
3. **As a user, I want to track my progress in completing tasks so that I can see my habit formation over time.**


## Wireframes
- **Home Screen**: Displays upcoming alarms and progress tracking.
- **Alarm Setup**: Allows users to set alarms, choose sounds, and select tasks.
- **Task Screen**: Displays the task that needs to be completed to dismiss the alarm.
- **Progress Screen**: Shows user progress and habit formation statistics.


## Project Setup and Folder Structure

### Folder Structure
```
Nudnik/
├── assets/                # Asset files (images, fonts, etc.)
├── components/            # Reusable components
│   ├── Button.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── context/               # Context API store
│   ├── AppContext.tsx     # Context and provider
│   ├── actions.ts         # Action types and creators
│   └── reducers.ts        # Reducers for state management
├── hooks/                 # Custom hooks
│   ├── useAuth.ts         # Example custom hook for authentication
│   └── useFetch.ts        # Example custom hook for data fetching
├── navigation/            # Navigation configuration
│   └── AppNavigator.tsx
├── screens/               # Screen components
│   ├── HomeScreen.tsx
│   ├── DetailsScreen.tsx
│   └── SettingsScreen.tsx
├── utils/                 # Utility functions
│   └── helpers.ts
├── App.tsx                # Main application component
├── app.json               # Expo configuration
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

### Best Practices for Coding in React Native and Expo
1. **Component-Based Architecture**: Break down the UI into reusable components.
2. **State Management**: Use Context API for managing global state.
3. **Styling**: Use StyleSheet for consistent styling and avoid inline styles.
4. **Navigation**: Use React Navigation for handling navigation between screens.
5. **Testing**: Write unit tests using Jest and React Native Testing Library.
6. **Code Quality**: Use ESLint and Prettier for maintaining code quality and consistency.
7. **Performance Optimization**: Optimize images, use lazy loading, and avoid unnecessary re-renders.
8. **Documentation**: Maintain clear and concise documentation for the project.

### Best Practices for Error Handling and Logging
1. **Centralized Error Handling**: Implement a centralized error handling mechanism to catch and handle errors globally.
2. **Error Boundaries**: Use Reacts Error Boundaries to catch JavaScript errors in components and display fallback UI.
3. **Try-Catch Blocks**: Use try-catch blocks to handle exceptions in asynchronous code.
4. **User-Friendly Error Messages**: Display user-friendly error messages to inform users about issues without exposing technical details.
5. **Logging**: Use a logging library like `react-native-logs` or integrate with services like Sentry or Firebase Crashlytics for error tracking and logging.
6. **Network Error Handling**: Handle network errors gracefully by providing retry options and offline support.
7. **Validation**: Validate user inputs and API responses to prevent errors from occurring.
8. **Graceful Degradation**: Ensure the app continues to function with limited features if certain parts fail.

### Type Safety
1. **TypeScript**: Use TypeScript to add static type checking to your JavaScript code. This helps catch errors early in the development process and improves code quality.
2. **PropTypes**: For smaller projects or components, you can use PropTypes to validate the props passed to your React components.
3. **Type Definitions**: Create and maintain type definitions for your components, state, and props to ensure consistency and reduce runtime errors.
4. **Third-Party Libraries**: Use type-safe libraries and ensure their type definitions are correctly installed and used in your project.
5. **Strict Mode**: Enable strict mode in TypeScript to enforce stricter type checking and catch potential issues early.

