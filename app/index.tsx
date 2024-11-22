import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAlarms } from '../context/alarm-context';
import { AlarmItem } from '../components/alarm-item';
import AlarmSetupScreen from './alarm-setup-screen';
import { Alarm } from '@/types/alarm';
import { Link, router } from 'expo-router';

export default function HomeScreen() {
  const { alarms, removeAlarm, addAlarm } = useAlarms();

  return (
    <View style={styles.container}>
      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AlarmItem 
            alarm={item} 
            onDelete={() => removeAlarm(item.id)} 
          />
        )}
      />
      <Link href="/alarm-setup-screen" asChild>
        <Pressable style={styles.fab}>
          <Ionicons name="add" size={24} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});