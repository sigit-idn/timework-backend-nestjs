import { Controller, Get, HttpStatus, Inject, Post, PreconditionFailedException, Query, Body, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags    } from '@nestjs/swagger';
import { FindCondition                          } from 'typeorm';
import { Config, LoggerService, RestrictedGuard } from '../../common';
import { Service                                } from '../../tokens';
import { EmployeePipe                           } from '../flow';
import { Employee, EmployeeData, EmployeeInput  } from '../model';
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
        private readonly config         : Config,
        private readonly logger         : LoggerService,
        private readonly employeeService: EmployeeService
    ) { }

    /**
     * @method find
     * @description Find all employees
     * @param {FindCondition<Employee>} where
     * @returns {Promise<EmployeeData[]>}
     */
    @Get()
    @ApiResponse({
        status     : HttpStatus.OK,
        description: 'Find all employees',
        type       : EmployeeData
    })
    public async find(@Query() where?: FindCondition<Employee>): Promise<EmployeeData[]> {
        const employees = await this.employeeService.find(where);

        return employees.map(employee => employee.buildData());
    }

    /**
     * @method findOne
     * @description Find one employee by id
     * @param {string} id
     * @returns {Promise<EmployeeData>}
     */
    @Get(':id')
    @ApiResponse({
        status     : HttpStatus.OK,
        description: 'Find one employee by id',
        type       : EmployeeData
    })
    async findOne(@Param() { id }: EmployeeData): Promise<EmployeeData> {
        const employee = await this.employeeService.findOne(id);
        

        if (!employee) {
            throw new PreconditionFailedException('Employee not found');
        }

        return employee.buildData();
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
