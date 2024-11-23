import { Alarm } from '../types/alarm';

export function getNextAlarmDate(date: Date): Date {
    const now = new Date();
    const nextDate = new Date(date);
    
    // If the time has passed for today, schedule for tomorrow
    if (nextDate <= now) {
        nextDate.setDate(nextDate.getDate() + 1);
    }
    
    return nextDate;
}

export function formatAlarmTime(date: Date): string {
    return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
} 