import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common';
import { TaskInput         } from '../model';

/**
 * @class TaskPipe
 * @description Task pipe is used to validate task input from the client
 * @extends JoiValidationPipe
 */
export class TaskPipe extends JoiValidationPipe {

    public buildSchema(): Joi.Schema {

        return Joi.object<TaskInput>({
            employeeId : Joi.string().optional(),
            reportId   : Joi.optional(),
            title      : Joi.string().required(),
            description: Joi.string().required(),
            deadline   : Joi.date().required(),
            taskStart  : Joi.date().optional(),
            taskEnd    : Joi.date().optional(),
            isWorking  : Joi.boolean().default(false),
        });
    }
}