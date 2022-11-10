import { Inject, Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository                                } from '@nestjs/typeorm';
import { FindCondition, In, Repository, Not, IsNull      } from 'typeorm';
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
    public async find(
        where?: FindCondition<Employee> & Record<string, any>, 
        employeeId?: string
    ): Promise<Employee[]> {
        const companyId = await (await this.findOne({id: employeeId})).companyId

        if (where && Object.keys(where).length) {
            Object.keys(where).forEach((key: keyof FindCondition<Employee>) => {
                if (!Boolean(where?.[key]) || where?.[key] === 'null') {
                    where![key] = IsNull();
                }
            });
        }

        where = {
            ...where,
            companyId
        }

        const employees = await this.employeeRepository.find({ where, relations: ['tasks'] });

        const tasks = await this.taskService.find({employeeId: In(employees.map(({id}) => id))});
        
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
     * @param {string} employeeId
     * @returns {Promise<Employee>}
     */
    public async create({password, ...input}: Employee, employeeId: string): Promise<Employee> {
        const { companyId } = await (await this.findOne({id: employeeId}))

        const isEmployeeExists = await this.employeeRepository.findOne({
            where: [
                { phone: input.phone },
                { email: input.email },
            ],
        });

        if (isEmployeeExists) throw new PreconditionFailedException('Employee already exists');

        const employee = new Employee({
            ...input,
            password: await this.hashPassword(password),
            companyId,
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

        const isEmployeeExists = await this.employeeRepository.findOne({
            where: [
                { phone: input.phone },
                { email: input.email },
                { id: Not(id) },
            ],
        });

        if (isEmployeeExists) throw new PreconditionFailedException('Employee already exists');

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
