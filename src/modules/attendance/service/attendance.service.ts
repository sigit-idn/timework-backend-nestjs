import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository                        } from '@nestjs/typeorm';
import { FindCondition, Like, Repository               } from 'typeorm';
import { Attendance                              } from '../model';

/**
 * @class AttendanceService
 * @description Attendance service is used to handle all attendance related business logic
 */
@Injectable()
export class AttendanceService {

    public constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>
    ) { }

    /**
     * @method find
     * @description Find all attendances
     * @param {FindCondition<Attendance>} where
     * @returns {Promise<Attendance[]>}
     */
    public async find(where?: FindCondition<Attendance>): Promise<Attendance[]> {
        if (where && (where as any).month) {
            const month = (where as any).month;
            delete (where as any).month;

            where = {
                ...where,
                date: Like(`${month}%`),
            };
        }

        return await this.attendanceRepository.find({ 
            where,
            order: {
                date: 'ASC',
            },
        });
    }

    /**
     * @method findOne
     * @description Find one attendance
     * @param {FindCondition<Attendance>} where
     * @returns {Promise<Attendance>}
     */
    public async findOne(where: FindCondition<Attendance>): Promise<Attendance> {
        const attendance = await this.attendanceRepository.findOne({ where });

        if (!attendance) {
            throw new PreconditionFailedException('Attendance not found');
        }

        return attendance;
    }

    /**
     * @method create
     * @description Create new attendance
     * @param {Attendance} input
     * @returns {Promise<Attendance>}
     */
    public async create(input: Attendance): Promise<Attendance> {
        const attendance = new Attendance(input);
        
        return this.attendanceRepository.save(attendance);
    }

    /**
     * @method update
     * @description Update attendance
     * @param {Attendance} input
     * @returns {Promise<Attendance>}
     */
    public async update({id, ...input}: Attendance): Promise<Attendance> {
        const attendance = await this.findOne({id});

        attendance.set({
            id,
            ...input,
        });

        return attendance;
    }

    /**
     * @method delete
     * @description Delete attendance
     * @param {Attendance} input
     * @returns {Promise<Attendance>}
     */
    public async delete({id}: Attendance): Promise<Attendance> {
        const attendance = await this.findOne({id});

        return this.attendanceRepository.remove(attendance);
    }

    /**
     * @method workStart
     * @description Start work
     * @param {string} employeeId
     * @returns {Promise<Attendance>}
     */
    public async workStart(employeeId: string): Promise<Attendance> {
        return this.attend(employeeId, 'workStart');
    }

    /**
     * @method breakStart
     * @description Start break
     * @param {string} employeeId
     * @returns {Promise<Attendance>}
     */
    public async breakStart(employeeId: string): Promise<Attendance> {
        return this.attend(employeeId, 'breakStart');
    }

    /**
     * @method breakEnd
     * @description End break
     * @param {string} employeeId
     * @returns {Promise<Attendance>}
     */
    public async breakEnd(employeeId: string): Promise<Attendance> {
        return this.attend(employeeId, 'breakEnd');
    }

    /**
     * @method workEnd
     * @description End work
     * @param {string} employeeId
     * @returns {Promise<Attendance>}
     */
    public async workEnd(employeeId: string): Promise<Attendance> {
        return this.attend(employeeId, 'workEnd');
    }

    /**
     * @method attend
     * @description Attend for refactoring
     * @param {string} employeeId
     * @param {workStart | breakStart | breakEnd | workEnd} type
     * @returns {Promise<Attendance>}
     */
    public async attend(employeeId: string, type: 'workStart' | 'breakStart' | 'breakEnd' | 'workEnd'): Promise<Attendance> {
        const today = new Date().toISOString().split('T')[0];

        let attendance = await this.attendanceRepository.findOne({
            employeeId,
            date: today,
        });
        
        if (attendance) {
            attendance.set({
                ...attendance,
                [type]: new Date(),
            });
        } else {
            attendance = new Attendance({
                employeeId,
                date: today,
                [type]: new Date(),
            });
        }

        return this.attendanceRepository.save(attendance);
    }
}
