import { Controller, Get, HttpStatus, Inject, Post, PreconditionFailedException, Query, Body, UseGuards, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags  } from '@nestjs/swagger';
import { FindCondition                        } from 'typeorm';
import { Config, LoggerService, EmployeeGuard } from '../../common';
import { Service                              } from '../../tokens';
import { AttendancePipe                       } from '../flow';
import { Attendance, AttendanceData           } from '../model';
import { AttendanceService                    } from '../service';

/**
 * @class AttendanceController
 * @description Attendance controller is used to handle all the requests related to attendance
 */
@Controller('attendances')
@ApiTags('attendance')
@ApiBearerAuth()
@UseGuards(EmployeeGuard)
export class AttendanceController {

    public constructor(
        @Inject(Service.CONFIG)
        private readonly config         : Config,
        private readonly logger         : LoggerService,
        private readonly attendanceService: AttendanceService
    ) { }

    /**
     * @method find
     * @description Find all attendances
     * @param {FindCondition<Attendance>} where
     * @returns {Promise<AttendanceData[]>}
     */
    @Get()
    @ApiResponse({
        status     : HttpStatus.OK,
        description: 'Find all attendances',
        type       : AttendanceData
    })
    public async find(@Query() where?: FindCondition<Attendance>): Promise<AttendanceData[]> {
        const attendances = await this.attendanceService.find(where);

        return attendances.map(attendance => attendance.buildData());
    }

    /**
     * @method findOne
     * @description Find one attendance by id
     * @param {string} id
     * @returns {Promise<AttendanceData>}
     */
    @Get(':id')
    @ApiResponse({
        status     : HttpStatus.OK,
        description: 'Find one attendance by id',
        type       : AttendanceData
    })
    async findOne(@Param() { id }: Attendance): Promise<AttendanceData> {
        const attendance = await this.attendanceService.findOne({id});
        

        if (!attendance) {
            throw new PreconditionFailedException('Attendance not found');
        }

        return attendance.buildData();
    }

    /**
     * @method create
     * @description Create a new attendance
     * @param {Attendance} input
     * @returns {Promise<AttendanceData>}
     */
    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, type: AttendanceData })
    public async create(@Body(AttendancePipe) input: Attendance): Promise<AttendanceData> {

        if (this.config.EMPLOYEES_ALLOWED === 'no') {
            throw new PreconditionFailedException(`Not allowed to onboard attendances`);
        }

        const attendance = await this.attendanceService.create(input);
        this.logger.info(`Created new attendance with ID ${attendance.id}`);

        return attendance.buildData();
    }

    /**
     * @method update
     * @description Update an existing attendance
     * @param {Attendance} input
     * @returns {Promise<AttendanceData>}
     */
    @Put(':id')
    @ApiResponse({ status: HttpStatus.OK, type: AttendanceData })
    public async update(
        @Param() { id }: Attendance,
        @Body(AttendancePipe) { id: attendanceId, ...input }: Attendance)
    : Promise<AttendanceData> {
        const attendance = await this.attendanceService.update({id, ...input} as Attendance);
        this.logger.info(`Updated attendance with ID ${attendance.id}`);

        return attendance.buildData();
    }

}
