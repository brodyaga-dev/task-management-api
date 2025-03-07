import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { Log } from '../entities/log.entity';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto/task.dto';
import { User } from '../entities/user.entity';
export declare class TasksService {
    private taskRepository;
    private logRepository;
    constructor(taskRepository: Repository<Task>, logRepository: Repository<Log>);
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    getUserTasks(userId: string): Promise<Task[]>;
    updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto, user: User): Promise<Task>;
    deleteTask(id: string, user: User): Promise<void>;
}
