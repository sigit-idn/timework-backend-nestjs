import { forwardRef, Inject, Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository                                } from '@nestjs/typeorm';
import { FindCondition, Repository                       } from 'typeorm';
import { ReportService                                   } from '../../report/service';
import { Task                                            } from '../model';

/**
 * @class TaskService
 * @description Task service is used to handle all task related business logic
 */
@Injectable()
export class TaskService {

    public constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @Inject(forwardRef(() => ReportService))
        private readonly reportService: ReportService,
    ) { }

    /**
     * @method find
     * @description Find all tasks
     * @param {FindCondition<Task>} where
     * @returns {Promise<Task[]>}
     */
    public async find(where?: FindCondition<Task>): Promise<Task[]> {
        return this.taskRepository.find({ 
            where,
            order: {
                deadline: 'ASC'
            }
        });
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
    public async create(
        input: Partial<Task>,
    ): Promise<Task> {
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

        Object.assign(task, input);

        return this.taskRepository.save(task);
    }

    /**
     * @method delete
     * @description Delete task
     * @param {Task} input
     * @returns {Promise<Task>}
     */
    public async delete({id}: Partial<Task>): Promise<Task> {
        const task = await this.findOne({id});

        return this.taskRepository.remove(task);
    }

    /**
     * @method startTask
     * @description Start task
     * @param {string} taskId
     * @param {string} employeeId
     * @returns {Promise<Task>}
     */
    public async startTask(
        taskId: string,
        employeeId: string
    ): Promise<Task> {
        await this.taskRepository.update({employeeId}, {isWorking: false});
        const task = await this.findOne({id: taskId});
        
        task.taskStart = new Date();
        task.isWorking = true;

        return this.taskRepository.save(task);
    }

    /**
     * @method finishTask
     * @description Finish task
     * @param {string} id
     * @returns {Promise<Task>}
     */
    public async finishTask(id: string): Promise<Task> {
        const task = await this.findOne({id});
            
        let report;
        
        try {
            report = await this.reportService.findOne({
                date: new Date().toLocaleDateString().replace(/\//g, '-'),
                employeeId: task.employeeId,
            });

        } catch (e) {
            report = await this.reportService.create({
                date: new Date().toLocaleDateString().replace(/\//g, '-'),
                employeeId: task.employeeId,
            });
        }

        task.taskEnd = new Date();
        task.reportId = report.id;

        return this.taskRepository.save(task);
    }
}