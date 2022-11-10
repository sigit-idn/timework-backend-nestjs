import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common';
import { CompanyInput      } from '../model';

/**
 * @class CompanyPipe
 * @description Company pipe is used to validate company input from the client
 * @extends JoiValidationPipe
 */
export class CompanyPipe extends JoiValidationPipe {

    public buildSchema(): Joi.Schema {

        return Joi.object<CompanyInput>({
            name               : Joi.string().required(),
            address            : Joi.string().required(),
            phone              : Joi.string().required(),
            email              : Joi.string().required(),
            dateOfEstablishment: Joi.string().required(),
            companyNumber      : Joi.string().required(),
        });
    }
}