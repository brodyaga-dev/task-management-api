import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Log } from './log.entity';
import { TaskStatus } from './task-status.enum';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.CREATED,
  })
  status: TaskStatus;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.tasks, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => Log, log => log.task)
  logs: Log[];
}
