import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskData } from '.';
import { Employee } from '../../employee/model';
import { Report   } from '../../report/model';

/**
 * @class Task
 * @description Task entity means the task table in the database
 */
@Entity({ name: 'tasks' })
export class Task {
    constructor(...data: Partial<Task>[]) {
        Object.assign(this, ...data);
    }
    /**
     * @method set
     * @description Set task data
     * @param {TaskData} data
     * @returns {void}
     */
    public set(data: TaskData): void {
        Object.assign(this, data);
    }

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: string;

    @Column({ name: 'employee_id', type: 'varchar' })
    public employeeId: string;

    @Column({ name: 'report_id', type: 'varchar', nullable: true })
    public reportId: string;

    @Column({ name: 'title', type: 'varchar' })
    public title: string;

    @Column({ name: 'description', type: 'varchar' })
    public description: string;

    @Column({ name: 'deadline', type: 'timestamp' })
    public deadline: Date;

    @Column({ name: 'is_working', type: 'boolean', default: false })
    public isWorking: boolean;

    @Column({ name: 'task_start', type: 'timestamp', nullable: true })
    public taskStart: Date|null;

    @Column({ name: 'task_end', type: 'timestamp', nullable: true })
    public taskEnd: Date|null;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt: Date;

    @ManyToOne(_type => Employee, employee => employee.tasks)
    public employee: Employee;

    @ManyToOne(_type => Report, report => report.tasks)
    public report: Report;

    /**
     * @method buildData
     * @description Build task data
     * @returns {TaskData}
     */
    public buildData(): TaskData {
        return {
            id         : this.id,
            employeeId : this.employeeId,
            reportId   : this.reportId,
            title      : this.title,
            description: this.description,
            deadline   : this.deadline,
            isWorking  : this.isWorking,
            taskStart  : this.taskStart,
            taskEnd    : this.taskEnd,
            createdAt  : this.createdAt,
            updatedAt  : this.updatedAt,
        };
    }
}