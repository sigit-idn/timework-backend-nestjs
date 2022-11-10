import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common';
import { ReportInput       } from '../model';

/**
 * @class ReportPipe
 * @description Report pipe is used to validate report input from the client
 * @extends JoiValidationPipe
 */
export class ReportPipe extends JoiValidationPipe {

    public buildSchema(): Joi.Schema {

        return Joi.object<ReportInput>({
            employeeId: Joi.string().required(),
            date      : Joi.string().required().regex(/^\d{4}-\d{2}-\d{2}$/),
            notes     : Joi.string().optional(),
        });

    }
}
