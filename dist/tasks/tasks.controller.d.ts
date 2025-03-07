import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto/task.dto';
import { User } from '../entities/user.entity';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<import("../entities/task.entity").Task>;
    getUserTasks(userId: string): Promise<import("../entities/task.entity").Task[]>;
    updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto, user: User): Promise<import("../entities/task.entity").Task>;
    deleteTask(id: string, user: User): Promise<void>;
}
