import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useAlarms } from '../context/alarm-context';
import { AlarmItem } from './alarm-item'
import { ThemedText } from './ThemedText';

export const AlarmList = () => {
    const { alarms } = useAlarms();

    if (alarms.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <ThemedText>No alarms set. Add your first alarm!</ThemedText>
            </View>
        );
    }

    return (
        <FlatList
            data={alarms}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AlarmItem alarm={item} />}
            style={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
}); 