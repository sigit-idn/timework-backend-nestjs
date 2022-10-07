import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository                        } from '@nestjs/typeorm';
import { FindCondition, Repository               } from 'typeorm';
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
        return this.attendanceRepository.find({ where });
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
}
