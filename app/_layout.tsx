import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlarmProvider } from '../context/alarm-context';
import { setupNotifications } from '../utils/notifications';

// Initialize notifications when the app starts
setupNotifications().catch(console.error);

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AlarmProvider>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{
              title: 'My Alarms',
            }} 
          />
        </Stack>
      </AlarmProvider>
    </SafeAreaProvider>
  );
}