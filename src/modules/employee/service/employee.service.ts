import { Inject, Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository                                } from '@nestjs/typeorm';
import { FindCondition, Repository                       } from 'typeorm';
import { Employee                                        } from '../model';
import { hash, genSalt                                   } from 'bcrypt';
import { TaskService                                     } from '../../task/service';

/**
 * @class EmployeeService
 * @description Employee service is used to handle all employee related business logic
 */
@Injectable()
export class EmployeeService {

    public constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,

        @Inject(TaskService)
        private readonly taskService: TaskService,
    ) { }

    /**
     * @method find
     * @description Find all employees
     * @param {FindCondition<Employee>} where
     * @param {string} employeeId
     * @returns {Promise<Employee[]>}
     */
    public async find(where?: FindCondition<Employee>, employeeId?: string): Promise<Employee[]> {
        const companyId = await (await this.findOne({id: employeeId})).companyId

        where = {
            ...where,
            companyId
        }

        const employees = await this.employeeRepository.find({ where, relations: ['tasks'] });

        const tasks = await this.taskService.find({ employeeId: employeeId });
        
        employees.forEach(employee => {
            employee.tasks = tasks.filter(({employeeId}) => employeeId == employee.id)
        })

        return employees;
    }

    /**
     * @method findOne
     * @description Find one employee
     * @param {FindCondition<Employee>} where
     * @returns {Promise<Employee>}
     */
    public async findOne(where: FindCondition<Employee>): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({ where });

        if (!employee) {
            throw new PreconditionFailedException('Employee not found');
        }

        return employee;
    }

    /**
     * @method create
     * @description Create new employee
     * @param {Employee} input
     * @returns {Promise<Employee>}
     */
    public async create({password, ...input}: Employee): Promise<Employee> {
        const employee = new Employee({
            ...input,
            password: await this.hashPassword(password)
        })

        return this.employeeRepository.save(employee);
    }

    /**
     * @method update
     * @description Update employee
     * @param {Employee} input
     * @returns {Promise<Employee>}
     */
    public async update({id, password, ...input}: Employee): Promise<Employee> {
        const employee = await this.findOne({id});

        employee.set({
            id,
            ...input,
            password: password ? await this.hashPassword(password) : employee.password,
        });

        return employee;
    }

    /**
     * @method delete
     * @description Delete employee
     * @param {Employee} input
     * @returns {Promise<Employee>}
     */
    public async delete({id}: Employee): Promise<Employee> {
        const employee = await this.findOne({id});

        return this.employeeRepository.remove(employee);
    }

    /**
     * @method hashPassword
     * @description Hash password
     * @param {string} password
     * @returns {Promise<string>}
     */
    public async hashPassword(password: string): Promise<string> {
        const salt = await genSalt(10);

        return hash(password, salt);
    }
}
