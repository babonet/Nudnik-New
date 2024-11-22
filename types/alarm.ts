export type TaskType = 'MATH' | 'QR_CODE' | 'BAR_CODE';

export interface Task {
    type: TaskType;
    config?: {
        difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
        code?: string; // For QR/BAR code tasks
    };
}

export interface Alarm {
    id: string;
    date: Date;
    isEnabled: boolean;
    sound?: string;
    task: Task;
    snoozeCount?: number;
    snoozeLimit?: number;
}