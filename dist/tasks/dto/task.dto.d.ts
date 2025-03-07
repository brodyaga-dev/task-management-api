import { TaskStatus } from '../../entities/task-status.enum';
export declare class CreateTaskDto {
    title: string;
    description: string;
}
export declare class UpdateTaskStatusDto {
    status: TaskStatus;
}
