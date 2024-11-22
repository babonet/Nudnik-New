import * as Notifications from 'expo-notifications';
import { Alarm } from '../types/alarm';

export async function scheduleAlarmNotification(alarm: Alarm) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Wake Up!',
            body: `Time to complete your ${alarm.task.type} task!`,
            data: { alarmId: alarm.id },
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: alarm.date,
        },
    });
}

export async function cancelAlarmNotification(alarmId: string) {
    await Notifications.cancelScheduledNotificationAsync(alarmId);
}

export async function setupNotifications() {
    await Notifications.requestPermissionsAsync();
    
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });
}