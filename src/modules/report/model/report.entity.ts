import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReportData                             } from '.';
import { Task } from '../../task/model';

/**
 * @class Report
 * @description Report entity means the report table in the database
 */
@Entity({ name: 'report' })
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

    @Column({ name: 'date' })
    public date: Date;

    @Column({ name: 'notes' })
    public notes: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt: Date;

    @OneToMany(() => Task, task => task.reportId)
    public tasks: Task[];
    
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
}