import { Task } from './task.entity';
import { Log } from './log.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    tasks: Task[];
    logs: Log[];
}
