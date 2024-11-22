import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alarm } from '../types/alarm';
import { scheduleAlarmNotification, cancelAlarmNotification } from '../utils/notifications';

interface AlarmContextType {
    alarms: Alarm[];
    addAlarm: (alarm: Omit<Alarm, 'id'>) => void;
    removeAlarm: (id: string) => void;
    toggleAlarm: (id: string) => void;
    updateAlarm: (id: string, alarm: Partial<Alarm>) => void;
    getAlarm: (id: string) => Alarm | undefined;
}

const AlarmContext = createContext<AlarmContextType | undefined>(undefined);

export const AlarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [alarms, setAlarms] = useState<Alarm[]>([]);

    const addAlarm = useCallback(async (newAlarm: Omit<Alarm, 'id'>) => {
        const alarm: Alarm = {
            ...newAlarm,
            id: Date.now().toString(),
        };
        
        if (alarm.isEnabled) {
            await scheduleAlarmNotification(alarm);
        }
        
        setAlarms(prev => [...prev, alarm]);
    }, []);

    const removeAlarm = useCallback(async (id: string) => {
        await cancelAlarmNotification(id);
        setAlarms(prev => prev.filter(alarm => alarm.id !== id));
    }, []);

    const toggleAlarm = useCallback(async (id: string) => {
        setAlarms(prev => prev.map(alarm => {
            if (alarm.id === id) {
                const newState = !alarm.isEnabled;
                if (newState) {
                    scheduleAlarmNotification(alarm);
                } else {
                    cancelAlarmNotification(id);
                }
                return { ...alarm, isEnabled: newState };
            }
            return alarm;
        }));
    }, []);

    const updateAlarm = useCallback(async (id: string, updates: Partial<Alarm>) => {
        setAlarms(prev => prev.map(alarm => {
            if (alarm.id === id) {
                const updatedAlarm = { ...alarm, ...updates };
                if (updatedAlarm.isEnabled) {
                    scheduleAlarmNotification(updatedAlarm);
                }
                return updatedAlarm;
            }
            return alarm;
        }));
    }, []);

    const getAlarm = (id: string) => alarms.find(alarm => alarm.id === id);

    const value = {
        alarms,
        addAlarm,
        removeAlarm,
        toggleAlarm,
        updateAlarm,
        getAlarm,
    };

    return (
        <AlarmContext.Provider value={value}>
            {children}
        </AlarmContext.Provider>
    );
};

export const useAlarms = () => {
    const context = useContext(AlarmContext);
    if (context === undefined) {
        throw new Error('useAlarms must be used within an AlarmProvider');
    }
    return context;
}; 