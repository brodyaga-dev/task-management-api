import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../entities/task-status.enum';
import { Log } from '../entities/log.entity';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto/task.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      user,
      userId: user.id,
    });

    await this.taskRepository.save(task);

    // Log the task creation
    const log = this.logRepository.create({
      user,
      userId: user.id,
      task,
      taskId: task.id,
      points: 2,
      transition_status: TaskStatus.CREATED,
    });

    await this.logRepository.save(log);

    return task;
  }

  async getUserTasks(userId: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== user.id) {
      throw new ForbiddenException('You can only update your own tasks');
    }

    // Create log entry for status change
    const log = this.logRepository.create({
      user,
      userId: user.id,
      task,
      taskId: task.id,
      points: 2,
      transition_status: updateTaskStatusDto.status,
    });

    await this.logRepository.save(log);

    // Update task status
    task.status = updateTaskStatusDto.status;
    return this.taskRepository.save(task);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== user.id) {
      throw new ForbiddenException('You can only delete your own tasks');
    }

    await this.taskRepository.remove(task);
  }
}
