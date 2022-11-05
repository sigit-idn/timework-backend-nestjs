import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReportData                             } from '.';
import { Employee } from '../../employee/model';
import { Task } from '../../task/model';

/**
 * @class Report
 * @description Report entity means the report table in the database
 */
@Entity({ name: 'reports' })
export class Report {
    constructor(...data: Partial<Report>[]) {
        Object.assign(this, ...data);
    }

    /**
     * @method set
     * @description Set report data
     * @param {ReportData} data
     * @returns {void}
     */
    public set(data: ReportData): void {
        Object.assign(this, data);
    }

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: string;

    @Column({ name: 'employee_id' })
    public employeeId: string;

    @Column({ name: 'date', type: 'varchar' })
    public date: string;

    @Column({ name: 'notes', type: 'varchar', nullable: true })
    public notes: string;

    @Column({ name: 'created_at', type: 'varchar', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;

    @Column({ name: 'updated_at', type: 'varchar', default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt: Date;

    @OneToMany(() => Task, task => task.report)
    public tasks: Task[];

    @ManyToOne(_type => Employee, employee => employee.reports)
    public employee: Employee;
    
    /**
     * @method buildData
     * @description Build report data
     * @returns {ReportData}
     */
    public buildData(): ReportData {
        return {
            id        : this.id,
            employeeId: this.employeeId,
            date      : this.date,
            notes     : this.notes,
            createdAt : this.createdAt,
            updatedAt : this.updatedAt,
        };
    }

    /**
     * @method buildDataWithRelations
     * @description Build report data with relations
     * @returns {ReportData}
     */
    public buildDataWithRelations(): ReportData {
        return {
            ...this.buildData(),
            tasks: this.tasks.map(task => task.buildData()),
        };
    }
}