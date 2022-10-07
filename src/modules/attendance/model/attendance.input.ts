import { ApiProperty } from '@nestjs/swagger';

/**
 * @class AttendanceInput
 * @description Attendance input is used to create and update attendance from the client
 */
export class AttendanceInput {
    @ApiProperty()
    public employeeId: string;

    @ApiProperty()
    public date: Date;

    @ApiProperty()
    public workStart: Date;

    @ApiProperty()
    public workEnd: Date;

    @ApiProperty()
    public breakStart: Date;

    @ApiProperty()
    public breakEnd: Date;
}