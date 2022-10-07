import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AttendanceData                           } from '.';

/**
 * @class Attendance
 * @description Attendance entity means the attendance table in the database
 */
@Entity({ name: 'attendance' })
export class Attendance {
    constructor(...data: Partial<Attendance>[]) {
        Object.assign(this, ...data);
    }
    
    /**
     * @method set
     * @description Set attendance data
     * @param {AttendanceData} data
     * @returns {void}
     */
    public set(data: AttendanceData): void {
        Object.assign(this, data);
    }

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: string;

    @Column({ name: 'employeeId' })
    public employeeId: string;

    @Column({ name: 'date' })
    public date: Date;

    @Column({ name: 'work_start' })
    public workStart: Date;

    @Column({ name: 'work_end' })
    public workEnd: Date;

    @Column({ name: 'break_start' })
    public breakStart: Date;

    @Column({ name: 'break_end' })
    public breakEnd: Date;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt: Date;

    /**
     * @method buildData
     * @description Build attendance data
     * @returns {AttendanceData}
     */
    public buildData(): AttendanceData {
        return {
            id        : this.id,
            employeeId: this.employeeId,
            date      : this.date,
            workStart : this.workStart,
            workEnd   : this.workEnd,
            breakStart: this.breakStart,
            breakEnd  : this.breakEnd,
            createdAt : this.createdAt,
            updatedAt : this.updatedAt,
        };
    }
}
