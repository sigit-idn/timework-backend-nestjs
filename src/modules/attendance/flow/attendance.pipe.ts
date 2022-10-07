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
            date      : Joi.date().required(),
            workStart : Joi.date().required(),
            workEnd   : Joi.date().required(),
            breakStart: Joi.date().required(),
            breakEnd  : Joi.date().required(),
        });

    }
}
