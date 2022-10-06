import { Injectable              } from '@nestjs/common';
import { InjectRepository        } from '@nestjs/typeorm';
import { Repository              } from 'typeorm';
import { Role                    } from '../../../enums/role';
import { Employee, EmployeeInput } from '../model';

/**
 * @class EmployeeService
 * @description Employee service is used to handle all employee related business logic
 */
@Injectable() // Decorator Injectable is used to inject the service into the controller
export class EmployeeService {

    public constructor(
        @InjectRepository(Employee) // Inject the repository into the service
        private readonly employeeRepository: Repository<Employee>
    ) { }

    public async find(): Promise<Employee[]> {
        return this.employeeRepository.find();
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
