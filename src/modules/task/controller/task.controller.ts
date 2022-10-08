import { Controller, Get, HttpStatus, Inject, Post, PreconditionFailedException, Query, Body, UseGuards, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindCondition                       } from 'typeorm';
import { Config, LoggerService               } from '../../common';
import { EmployeeGuard                       } from '../../common/security';
import { Service                             } from '../../tokens';
import { TaskPipe                            } from '../flow';
import { Task, TaskData                      } from '../model';
import { TaskService                         } from '../service';

/**
 * @class TaskController
 * @description Task controller is used to handle all the requests related to task
 */
@Controller('tasks')
@ApiTags('task')
@ApiBearerAuth()
@UseGuards(EmployeeGuard)
export class TaskController {

    public constructor(
        @Inject(Service.CONFIG)
        private readonly config     : Config,
        private readonly logger     : LoggerService,
        private readonly taskService: TaskService
    ) { }

    /**
     * @method find
     * @description Find all tasks
     * @param {FindCondition<Task>} where
     * @returns {Promise<TaskData[]>}
     */
    @Get()
    @ApiResponse({
        status     : HttpStatus.OK,
        description: 'Find all tasks',
        type       : TaskData
    })
    public async find(@Query() where?: FindCondition<Task>): Promise<TaskData[]> {
        const tasks = await this.taskService.find(where);

        return tasks.map(task => task.buildData());
    }

    /**
     * @method findOne
     * @description Find one task by id
     * @param {string} id
     * @returns {Promise<TaskData>}
     */
    @Get(':id')
    @ApiResponse({
        status     : HttpStatus.OK,
        description: 'Find one task by id',
        type       : TaskData
    })
    async findOne(@Param() { id }: Task): Promise<TaskData> {
        const task = await this.taskService.findOne({id});
        

        if (!task) {
            throw new PreconditionFailedException('Task not found');
        }

        return task.buildData();
    }

    /**
     * @method create
     * @description Create a new task
     * @param {Task} input
     * @returns {Promise<TaskData>}
     */
    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, type: TaskData })
    public async create(@Body(TaskPipe) input: Task): Promise<TaskData> {

        if (this.config.EMPLOYEES_ALLOWED === 'no') {
            throw new PreconditionFailedException(`Not allowed to onboard tasks`);
        }

        const task = await this.taskService.create(input);
        this.logger.info(`Created new task with ID ${task.id}`);

        return task.buildData();
    }

    /**
     * @method update
     * @description Update an existing task
     * @param {Task} input
     * @returns {Promise<TaskData>}
     */
    @Put(':id')
    @ApiResponse({ status: HttpStatus.OK, type: TaskData })
    public async update(
        @Param() { id }: Task,
        @Body(TaskPipe) { id: taskId, ...input }: Task)
    : Promise<TaskData> {
        const task = await this.taskService.update({id, ...input} as Task);
        this.logger.info(`Updated task with ID ${task.id}`);

        return task.buildData();
    }

}
