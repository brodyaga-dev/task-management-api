"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("../entities/task.entity");
const task_status_enum_1 = require("../entities/task-status.enum");
const log_entity_1 = require("../entities/log.entity");
let TasksService = class TasksService {
    taskRepository;
    logRepository;
    constructor(taskRepository, logRepository) {
        this.taskRepository = taskRepository;
        this.logRepository = logRepository;
    }
    async createTask(createTaskDto, user) {
        const task = this.taskRepository.create({
            ...createTaskDto,
            user,
            userId: user.id,
        });
        await this.taskRepository.save(task);
        const log = this.logRepository.create({
            user,
            userId: user.id,
            task,
            taskId: task.id,
            points: 2,
            transition_status: task_status_enum_1.TaskStatus.CREATED,
        });
        await this.logRepository.save(log);
        return task;
    }
    async getUserTasks(userId) {
        return this.taskRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
    async updateTaskStatus(id, updateTaskStatusDto, user) {
        const task = await this.taskRepository.findOne({
            where: { id },
        });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        if (task.userId !== user.id) {
            throw new common_1.ForbiddenException('You can only update your own tasks');
        }
        const log = this.logRepository.create({
            user,
            userId: user.id,
            task,
            taskId: task.id,
            points: 2,
            transition_status: updateTaskStatusDto.status,
        });
        await this.logRepository.save(log);
        task.status = updateTaskStatusDto.status;
        return this.taskRepository.save(task);
    }
    async deleteTask(id, user) {
        const task = await this.taskRepository.findOne({
            where: { id },
        });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        if (task.userId !== user.id) {
            throw new common_1.ForbiddenException('You can only delete your own tasks');
        }
        await this.taskRepository.remove(task);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(log_entity_1.Log)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map