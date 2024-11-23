import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import { Alarm } from '../types/alarm';

export async function setupNotifications() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('alarms', {
            name: 'Alarms',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
            priority: Notifications.AndroidNotificationPriority.MAX,
        }),
    });

    // Handle notifications when app is in foreground
    Notifications.addNotificationReceivedListener((notification) => {
        console.log('Notification received in foreground:', notification);
    });

    // Handle notification responses (when user taps notification)
    Notifications.addNotificationResponseReceivedListener((response) => {
        const alarmId = response.notification.request.content.data.alarmId;
        if (alarmId) {
            router.push({
                pathname: '/task-screen',
                params: { id: alarmId }
            });
        }
    });
}

export async function scheduleAlarmNotification(alarm: Alarm) {
    // Cancel any existing notification for this alarm
    await cancelAlarmNotification(alarm.id);

    // Ensure the date is in the future
    const now = new Date();
    const scheduledDate = new Date(alarm.date);
    
    if (scheduledDate <= now) {
        // If the time has passed for today, schedule for tomorrow
        scheduledDate.setDate(scheduledDate.getDate() + 1);
    }

    return await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Wake Up!',
            body: `Time to complete your ${alarm.task.type.toLowerCase()} task!`,
            data: { alarmId: alarm.id },
            sound: alarm.sound || 'default',
            priority: 'max',
        },
        trigger: {
            date: scheduledDate,
            channelId: Platform.OS === 'android' ? 'alarms' : undefined,
        },
    });
}

export async function cancelAlarmNotification(alarmId: string) {
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    const notification = scheduledNotifications.find(
        n => n.content.data?.alarmId === alarmId
    );
    
    if (notification) {
        await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
}

export async function rescheduleAllAlarms(alarms: Alarm[]) {
    // Cancel all existing notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Reschedule all enabled alarms
    for (const alarm of alarms) {
        if (alarm.isEnabled) {
            await scheduleAlarmNotification(alarm);
        }
    }
}