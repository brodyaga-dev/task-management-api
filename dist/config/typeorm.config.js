"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const user_entity_1 = require("../entities/user.entity");
const task_entity_1 = require("../entities/task.entity");
const log_entity_1 = require("../entities/log.entity");
exports.typeOrmConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'task_management',
    entities: [user_entity_1.User, task_entity_1.Task, log_entity_1.Log],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: true,
};
//# sourceMappingURL=typeorm.config.js.map