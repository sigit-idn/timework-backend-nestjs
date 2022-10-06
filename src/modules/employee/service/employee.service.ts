import { Injectable, PreconditionFailedException                } from '@nestjs/common';
import { InjectRepository          } from '@nestjs/typeorm';
import { FindCondition, Repository } from 'typeorm';
import { Role                      } from '../../../enums/role';
import { Employee, EmployeeInput   } from '../model';

/**
 * @class EmployeeService
 * @description Employee service is used to handle all employee related business logic
 */
@Injectable()
export class EmployeeService {

    public constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>
    ) { }

    /**
     * @method find
     * @description Find all employees
     * @param {FindCondition<Employee>} where
     * @returns {Promise<Employee[]>}
     */
    public async find(where?: FindCondition<Employee>): Promise<Employee[]> {
        return this.employeeRepository.find({ where });
    }

    /**
     * @method findOne
     * @description Find one employee by id
     * @param {string} id
     * @returns {Promise<Employee>}
     */
    public async findOne(id: string): Promise<Employee> {
        const employee = await this.employeeRepository.findOne(id);

        if (!employee) {
            throw new PreconditionFailedException('Employee not found');
        }

        return employee;
    }

    public async create(input: EmployeeInput): Promise<Employee> {

        const employee = new Employee();

        employee.name      = input.name;
        employee.phone     = input.phone;
        employee.email     = input.email;
        employee.password  = input.password;
        employee.position  = input.position;
        employee.role      = input.role as Role
        employee.companyId = input.companyId;
        employee.address   = input.address;
        employee.createdAt = input.createdAt;
        employee.updatedAt = input.updatedAt;

        return this.employeeRepository.save(employee);
    }

}
