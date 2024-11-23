import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useAlarms } from '../context/alarm-context';
import { Alarm, TaskType } from '../types/alarm';
import { useLocalSearchParams, Stack } from 'expo-router';
import { router } from 'expo-router';

export default function AlarmSetupScreen() {
    const { id: rawId } = useLocalSearchParams();
    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    const { addAlarm, updateAlarm, getAlarm } = useAlarms();
    const [date, setDate] = useState(() => {
        return id ? getAlarm(id)?.date || new Date() : new Date();
    });
    const [taskType, setTaskType] = useState<TaskType>(() => {
        return id ? getAlarm(id)?.task.type || 'MATH' : 'MATH';
    });
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString([], { 
            weekday: 'short',
            month: 'short', 
            day: 'numeric'
        });
    };

    const handleSave = () => {
        const alarmData = {
            date,
            isEnabled: true,
            task: { type: taskType },
            snoozeCount: 0,
            snoozeLimit: 3,
        };

        if (id) {
            updateAlarm(id, alarmData);
        } else {
            addAlarm(alarmData);
        }
        router.back();
    };

    return (
        <>
            <Stack.Screen options={{ title: id ? "Edit Alarm" : "New Alarm" }} />
            <View style={styles.container}>
                <View style={styles.dateTimeContainer}>
                    <View style={styles.dateTimeItem}>
                        <Text style={styles.label}>Date: {formatDate(date)}</Text>
                        <Button 
                            title="Select Date" 
                            onPress={() => setShowDatePicker(true)} 
                        />
                    </View>
                    <View style={styles.dateTimeItem}>
                        <Text style={styles.label}>Time: {formatTime(date)}</Text>
                        <Button 
                            title="Select Time" 
                            onPress={() => setShowTimePicker(true)} 
                        />
                    </View>
                </View>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        onChange={(_, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                                const newDate = new Date(date);
                                newDate.setFullYear(
                                    selectedDate.getFullYear(),
                                    selectedDate.getMonth(),
                                    selectedDate.getDate()
                                );
                                setDate(newDate);
                            }
                        }}
                    />
                )}
                {showTimePicker && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        onChange={(_, selectedDate) => {
                            setShowTimePicker(false);
                            if (selectedDate) {
                                const newDate = new Date(date);
                                newDate.setHours(selectedDate.getHours());
                                newDate.setMinutes(selectedDate.getMinutes());
                                setDate(newDate);
                            }
                        }}
                    />
                )}

                <Picker
                    selectedValue={taskType}
                    onValueChange={(value) => setTaskType(value as TaskType)}>
                    <Picker.Item label="Math Problem" value="MATH" />
                    <Picker.Item label="QR Code Scan" value="QR_CODE" />
                    <Picker.Item label="Bar Code Scan" value="BAR_CODE" />
                </Picker>

                <View style={styles.buttonContainer}>
                    <Button title="Cancel" onPress={() => router.back()} />
                    <Button title={id ? "Update Alarm" : "Save Alarm"} onPress={handleSave} />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    dateTimeContainer: {
        marginBottom: 20,
    },
    dateTimeItem: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
});