import React from 'react';
import { View, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useAlarms } from '../context/alarm-context';
import { Alarm } from '../types/alarm';
import { ThemedText } from './ThemedText';
import { useRouter } from 'expo-router';

interface AlarmItemProps {
    alarm: Alarm;
}

export const AlarmItem = ({ alarm }: AlarmItemProps) => {
    let alarmContextValue;
    try {
        alarmContextValue = useAlarms();
        if (!alarmContextValue) {
            console.error('Alarm context is undefined');
            return null;
        }
    } catch (error) {
        console.error('Error accessing alarm context:', error);
        return <ThemedText>Error loading alarm</ThemedText>;
    }

    const { toggleAlarm } = alarmContextValue;
    const router = useRouter();

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => router.push(`/alarm-setup-screen`)}>
            <View style={styles.timeContainer}>
                <ThemedText type="title">{formatTime(alarm.date)}</ThemedText>
                <ThemedText>{alarm.task.type}</ThemedText>
            </View>
            <Switch
                value={alarm.isEnabled}
                onValueChange={() => toggleAlarm(alarm.id)}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    timeContainer: {
        flex: 1,
    },
}); 