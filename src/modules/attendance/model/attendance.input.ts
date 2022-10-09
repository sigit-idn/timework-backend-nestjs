import { ApiProperty } from '@nestjs/swagger';

/**
 * @class AttendanceInput
 * @description Attendance input is used to create and update attendance from the client
 */
export class AttendanceInput {
    @ApiProperty()
    public employeeId: string;

    @ApiProperty()
    public date: string;

    @ApiProperty()
    public workStart: Date|null;

    @ApiProperty()
    public workEnd: Date|null;

    @ApiProperty()
    public breakStart: Date|null;

    @ApiProperty()
    public breakEnd: Date|null;
}