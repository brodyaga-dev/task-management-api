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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const task_entity_1 = require("./task.entity");
const task_status_enum_1 = require("./task-status.enum");
let Log = class Log {
    id;
    user;
    userId;
    task;
    taskId;
    points;
    transition_status;
    timestamp;
};
exports.Log = Log;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Log.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.logs, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Log.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Log.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_entity_1.Task, task => task.logs, { onDelete: 'CASCADE' }),
    __metadata("design:type", task_entity_1.Task)
], Log.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Log.prototype, "taskId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Log.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: task_status_enum_1.TaskStatus,
    }),
    __metadata("design:type", String)
], Log.prototype, "transition_status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Log.prototype, "timestamp", void 0);
exports.Log = Log = __decorate([
    (0, typeorm_1.Entity)('logs')
], Log);
//# sourceMappingURL=log.entity.js.map