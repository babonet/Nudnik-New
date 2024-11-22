import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useAlarms } from '../context/alarm-context';
import { TaskType } from '../types/alarm';
import { useLocalSearchParams } from 'expo-router';
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
    const [showPicker, setShowPicker] = useState(false);

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
        <View style={styles.container}>
            <Button title="Select Time" onPress={() => setShowPicker(true)} />
            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="time"
                    onChange={(_, selectedDate) => {
                        setShowPicker(false);
                        setDate(selectedDate || date);
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
});