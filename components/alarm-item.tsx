import React from 'react';
import { View, StyleSheet, TouchableOpacity, Switch, Pressable } from 'react-native';
import { useAlarms } from '../context/alarm-context';
import { Alarm } from '../types/alarm';
import { ThemedText } from './ThemedText';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface AlarmItemProps {
    alarm: Alarm;
    onDelete: () => void;
}

export const AlarmItem: React.FC<AlarmItemProps> = ({ alarm, onDelete }) => {
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
            onPress={() => router.push({
                pathname: '/alarm-setup-screen',
                params: { id: alarm.id }
            })}>
            <View style={styles.timeContainer}>
                <ThemedText type="title">{formatTime(alarm.date)}</ThemedText>
                <ThemedText>{alarm.task.type}</ThemedText>
            </View>
            <Switch
                value={alarm.isEnabled}
                onValueChange={() => toggleAlarm(alarm.id)}
            />
            <Pressable onPress={onDelete} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={24} color="#FF3B30" />
            </Pressable>
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
    deleteButton: {
        padding: 8,
    },
}); 