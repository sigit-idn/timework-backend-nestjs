import { Controller, Get, HttpStatus, Inject, Post, PreconditionFailedException, Query, Body, UseGuards, Param, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindCondition                       } from 'typeorm';
import { Config, LoggerService               } from '../../common';
import { AdminGuard,          } from '../../common/security';
import { Service                             } from '../../tokens';
import { EmployeePipe                        } from '../flow';
import { Employee, EmployeeData              } from '../model';
import { EmployeeService                     } from '../service';

/**
 * @class EmployeeController
 * @description Employee controller is used to handle all the requests related to employee
 */
@Controller('employees')
@ApiTags('employee')
@ApiBearerAuth()
// @UseGuards(EmployeeGuard)
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
     * @param {Request} req
     * @returns {Promise<EmployeeData[]>}
     */
    @Get()
    @ApiResponse({
        status     : HttpStatus.OK,
        description: 'Find all employees',
        type       : EmployeeData
    })
    public async find(
        @Query() where?: FindCondition<Employee>,
        @Req() req?: Request|any
    ): Promise<Partial<Employee>[]> {
        const { employeeId } = req.params;
        const employees = await this.employeeService.find(where, employeeId);
        console.log('employees', employees);
        

        return employees.map(employee => employee.buildRelatedData());
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
    @ApiResponse({ status: HttpStatus.CREATED, type: EmployeeData })
    @UseGuards(AdminGuard)
    public async create(
        @Body(EmployeePipe) input: Employee,
        @Req() req?: Request|any
    ): Promise<EmployeeData> {
        const { employeeId } = req.params;

        if (this.config.EMPLOYEES_ALLOWED === 'no') {
            throw new PreconditionFailedException(`Not allowed to onboard employees`);
        }

        const employee = await this.employeeService.create(input, employeeId);
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
    @ApiResponse({ status: HttpStatus.OK, type: EmployeeData })
    @UseGuards(AdminGuard)
    public async update(
        @Param() { id }: Employee,
        @Body(EmployeePipe) { id: employeeId, ...input }: Employee)
    : Promise<EmployeeData> {
        const employee = await this.employeeService.update({id, ...input} as Employee);
        this.logger.info(`Updated employee with ID ${employee.id}`);

        return employee.buildData();
    }

}
