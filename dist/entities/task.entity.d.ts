import { User } from './user.entity';
import { Log } from './log.entity';
import { TaskStatus } from './task-status.enum';
export declare class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    user: User;
    userId: string;
    logs: Log[];
}
