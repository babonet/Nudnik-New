import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlarmProvider } from './context/alarm-context';
import { setupNotifications } from './utils/notifications';
import HomeScreen from './app/index';

// Initialize notifications when the app starts
setupNotifications().catch(console.error);

export default function App() {
  return (
    <SafeAreaProvider>
      <AlarmProvider>
        <HomeScreen />
        <StatusBar style="auto" />
      </AlarmProvider>
    </SafeAreaProvider>
  );
}