import { Body, Controller, Get, HttpStatus, Inject, Post, PreconditionFailedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags    } from '@nestjs/swagger';
import { Config, LoggerService, RestrictedGuard } from '../../common';
import { Service                                } from '../../tokens';
import { EmployeePipe                           } from '../flow';
import { EmployeeData, EmployeeInput            } from '../model';
import { EmployeeService                        } from '../service';

/**
 * @class EmployeeController
 * @description Employee controller is used to handle all the requests related to employee
 */
@Controller('employees')
@ApiTags('employee')
@ApiBearerAuth()
export class EmployeeController {

    public constructor(
        @Inject(Service.CONFIG)
        private readonly config: Config,
        private readonly logger: LoggerService,
        private readonly employeeService: EmployeeService
    ) { }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: EmployeeData })
    public async find(): Promise<EmployeeData[]> {

        const employees = await this.employeeService.find();

        return employees.map(employee => employee.buildData());
    }

    @Post()
    @UseGuards(RestrictedGuard)
    @ApiResponse({ status: HttpStatus.CREATED, type: EmployeeData })
    public async create(@Body(EmployeePipe) input: EmployeeInput): Promise<EmployeeData> {

        if (this.config.EMPLOYEES_ALLOWED === 'no') {
            throw new PreconditionFailedException(`Not allowed to onboard employees`);
        }

        const employee = await this.employeeService.create(input);
        this.logger.info(`Created new employee with ID ${employee.id}`);

        return employee.buildData();
    }

}
