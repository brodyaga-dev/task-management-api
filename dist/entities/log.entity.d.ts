import { User } from './user.entity';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
export declare class Log {
    id: string;
    user: User;
    userId: string;
    task: Task;
    taskId: string;
    points: number;
    transition_status: TaskStatus;
    timestamp: Date;
}
