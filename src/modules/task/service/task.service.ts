import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository                        } from '@nestjs/typeorm';
import { FindCondition, Repository               } from 'typeorm';
import { Task                                    } from '../model';

/**
 * @class TaskService
 * @description Task service is used to handle all task related business logic
 */
@Injectable()
export class TaskService {

    public constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) { }

    /**
     * @method find
     * @description Find all tasks
     * @param {FindCondition<Task>} where
     * @returns {Promise<Task[]>}
     */
    public async find(where?: FindCondition<Task>): Promise<Task[]> {
        return this.taskRepository.find({ where });
    }

    /**
     * @method findOne
     * @description Find one task
     * @param {FindCondition<Task>} where
     * @returns {Promise<Task>}
     */
    public async findOne(where: FindCondition<Task>): Promise<Task> {
        const task = await this.taskRepository.findOne({ where });

        if (!task) {
            throw new PreconditionFailedException('Task not found');
        }

        return task;
    }

    /**
     * @method create
     * @description Create new task
     * @param {Task} input
     * @returns {Promise<Task>}
     */
    public async create(input: Task): Promise<Task> {
        const task = new Task(input);
        
        return this.taskRepository.save(task);
    }

    /**
     * @method update
     * @description Update task
     * @param {Task} input
     * @returns {Promise<Task>}
     */
    public async update({id, ...input}: Task): Promise<Task> {
        const task = await this.findOne({id});

        task.set({ id, ...input });

        return task;
    }

    /**
     * @method delete
     * @description Delete task
     * @param {Task} input
     * @returns {Promise<Task>}
     */
    public async delete({id}: Task): Promise<Task> {
        const task = await this.findOne({id});

        return this.taskRepository.remove(task);
    }
}
