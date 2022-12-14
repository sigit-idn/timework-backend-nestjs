import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common';
import { EmployeeInput     } from '../model';
import { Role              } from '../../tokens';

/**
 * @class EmployeePipe
 * @description Employee pipe is used to validate employee input from the client
 * @extends JoiValidationPipe
 */
export class EmployeePipe extends JoiValidationPipe {

    public buildSchema(): Joi.Schema {

        return Joi.object<EmployeeInput>({
            name     : Joi.string().required(),
            phone    : Joi.string().required().regex(/^[0-9]{10,12}$/),
            email    : Joi.string().required().email(),
            password : Joi.string().required(),
            position : Joi.string().required(),
            role     : Joi.valid(...Object.values(Role)).default(Role.EMPLOYEE),
            address  : Joi.string(),
            createdAt: Joi.string().default(new Date().toISOString()),
            updatedAt: Joi.string().default(new Date().toISOString())
        });

    }
}
