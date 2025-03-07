import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.logs, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Task, task => task.logs, { onDelete: 'CASCADE' })
  task: Task;

  @Column()
  taskId: string;

  @Column()
  points: number;

  @Column({
    type: 'enum',
    enum: TaskStatus,
  })
  transition_status: TaskStatus;

  @CreateDateColumn()
  timestamp: Date;
}
