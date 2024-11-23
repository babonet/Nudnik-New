import { Alert } from 'react-native';

export function logError(error: Error, context: string) {
    console.error(`Error in ${context}:`, error);
    // You could add more sophisticated error logging here
    // like sending to a service like Sentry
}

export function handleAlarmError(error: Error, context: string) {
    logError(error, context);
    
    // Show user-friendly error message
    Alert.alert(
        'Alarm Error',
        'There was a problem with your alarm. Please try again.',
        [{ text: 'OK' }]
    );
} 