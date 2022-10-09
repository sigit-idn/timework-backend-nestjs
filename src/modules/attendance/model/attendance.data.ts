import { ApiProperty } from '@nestjs/swagger';
  
/**
 * @class AttendanceData
 * @description Attendance data means the data that is sent to the client
 */
export class AttendanceData {
    @ApiProperty({ description: 'id', example: 1 })
    public id: string;

    @ApiProperty({ description: 'employeeId', example: 1 })
    public employeeId: string;

    @ApiProperty({ description: 'date', example: '2022-01-01' })
    public date: string;

    @ApiProperty({ description: 'workStart', example: '2022-01-01 08:00:00' })
    public workStart: Date|null;

    @ApiProperty({ description: 'workEnd', example: '2022-01-01 17:00:00' })
    public workEnd: Date|null;

    @ApiProperty({ description: 'breakStart', example: '2022-01-01 12:00:00' })
    public breakStart: Date|null;

    @ApiProperty({ description: 'breakEnd', example: '2022-01-01 13:00:00' })
    public breakEnd: Date|null;

    @ApiProperty({ description: 'createdAt', example: '2022-01-01 08:00:00' })
    public createdAt: Date;

    @ApiProperty({ description: 'updatedAt', example: '2022-01-01 08:00:00' })
    public updatedAt: Date;
}