import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto/task.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entities/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get('/user/:id')
  getUserTasks(@Param('id') userId: string) {
    return this.tasksService.getUserTasks(userId);
  }

  @Patch(':id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto, user);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.deleteTask(id, user);
  }
}
