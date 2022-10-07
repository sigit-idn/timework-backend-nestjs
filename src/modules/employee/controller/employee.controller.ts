import { Controller, Get, HttpStatus, Inject, Post, PreconditionFailedException, Query, Body, UseGuards, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags  } from '@nestjs/swagger';
import { FindCondition                        } from 'typeorm';
import { Config, LoggerService, EmployeeGuard } from '../../common';
import { AdminGuard                           } from '../../common/security/admin.guard';
import { Service                              } from '../../tokens';
import { EmployeePipe                         } from '../flow';
import { Employee, EmployeeData               } from '../model';
import { EmployeeService                      } from '../service';

/**
 * @class EmployeeController
 * @description Employee controller is used to handle all the requests related to employee
 */
@Controller('employees')
@ApiTags('employee')
@UseGuards(EmployeeGuard)
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
    async findOne(@Param() { id }: Employee): Promise<EmployeeData> {
        const employee = await this.employeeService.findOne({id});
        

        if (!employee) {
            throw new PreconditionFailedException('Employee not found');
        }

        return employee.buildData();
    }

    /**
     * @method create
     * @description Create a new employee
     * @param {Employee} input
     * @returns {Promise<EmployeeData>}
     */
    @Post()
    @UseGuards(AdminGuard)
    @ApiResponse({ status: HttpStatus.CREATED, type: EmployeeData })
    public async create(@Body(EmployeePipe) input: Employee): Promise<EmployeeData> {

        if (this.config.EMPLOYEES_ALLOWED === 'no') {
            throw new PreconditionFailedException(`Not allowed to onboard employees`);
        }

        const employee = await this.employeeService.create(input);
        this.logger.info(`Created new employee with ID ${employee.id}`);

        return employee.buildData();
    }

    /**
     * @method update
     * @description Update an existing employee
     * @param {Employee} input
     * @returns {Promise<EmployeeData>}
     */
    @Put(':id')
    @UseGuards(AdminGuard)
    @ApiResponse({ status: HttpStatus.OK, type: EmployeeData })
    public async update(
        @Param() { id }: Employee,
        @Body(EmployeePipe) { id: employeeId, ...input }: Employee)
    : Promise<EmployeeData> {
        const employee = await this.employeeService.update({id, ...input} as Employee);
        this.logger.info(`Updated employee with ID ${employee.id}`);

        return employee.buildData();
    }

}
