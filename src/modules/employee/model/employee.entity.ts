import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeData                                      } from '.';
import { Attendance                                        } from '../../attendance/model';
import { Report                                            } from '../../report/model';
import { Task                                              } from '../../task/model';

/**
 * @class Employee
 * @description Employee entity means the employee table in the database
 */
@Entity({ name: 'employees' })
export class Employee {
    constructor(...data: Partial<Employee>[]) {
        Object.assign(this, ...data);
    }

    /**
     * @method set
     * @description Set employee data
     * @param {EmployeeData} data
     * @returns {void}
     */
    public set(data: EmployeeData): void {
        Object.assign(this, data);
    }

    public static readonly NAME_LENGTH = 50;

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: string;

    @Column({ name: 'name', type: 'varchar', length: Employee.NAME_LENGTH })
    public name: string;

    @Column({ name: 'phone', type: 'varchar', nullable: true })
    public phone: string;

    @Column({ name: 'email', type: 'varchar' })
    public email: string;

    @Column({ name: 'password', type: 'varchar' })
    public password: string;

    @Column({ name: 'position', type: 'varchar' })
    public position: string;

    @Column({ name: 'role', type: 'varchar' })
    public role: string;

    @Column({ name: 'companyId', type: 'varchar' })
    public companyId: string;

    @Column({ name: 'address', type: 'varchar', nullable: true })
    public address: string;

    @Column({ name: 'createdAt', type: 'varchar', default: () => 'now()' })
    public createdAt: string;

    @Column({ name: 'updatedAt', type: 'varchar', default: () => 'now()' })
    public updatedAt: string;

    @OneToMany(_type => Attendance, attendance => attendance.employee)
    public attendances: Attendance[];

    @OneToMany(_type => Report, report => report.employee)
    public reports: Report[];

    @OneToMany(_type => Task, task => task.employee)
    public tasks: Task[];

    public buildData(): EmployeeData {

        return {
            id       : this.id,
            name     : this.name,
            phone    : this.phone,
            email    : this.email,
            position : this.position,
            role     : this.role,
            companyId: this.companyId,
            address  : this.address,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    public buildRelatedData(): Partial<Employee> {
        return {
            ...this.buildData(),
            attendances: this.attendances,
            reports    : this.reports,
            tasks      : this.tasks
        };
    }

}
