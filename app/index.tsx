import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAlarms } from '../context/alarm-context';
import { AlarmItem } from '../components/alarm-item';
import AlarmSetupScreen from './alarm-setup-screen';

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { alarms } = useAlarms();

  return (
    <View style={styles.container}>
      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AlarmItem alarm={item} />}
      />
      
      <Pressable 
        style={styles.fab}
        onPress={() => setIsModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="white" />
      </Pressable>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <AlarmSetupScreen onClose={() => setIsModalVisible(false)} />
      </Modal>
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