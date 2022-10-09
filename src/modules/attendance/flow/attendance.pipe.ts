import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common';
import { AttendanceInput   } from '../model';

/**
 * @class AttendancePipe
 * @description Attendance pipe is used to validate attendance input from the client
 * @extends JoiValidationPipe
 */
export class AttendancePipe extends JoiValidationPipe {

    public buildSchema(): Joi.Schema {

        return Joi.object<AttendanceInput>({
            employeeId: Joi.string().required(),
            date      : Joi.string().required().regex(/^\d{4}-\d{2}-\d{2}$/),
            workStart : Joi.date().optional(),
            workEnd   : Joi.date().optional(),
            breakStart: Joi.date().optional(),
            breakEnd  : Joi.date().optional(),
        });

    }
}
