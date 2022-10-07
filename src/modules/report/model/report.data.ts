import { ApiProperty } from '@nestjs/swagger';
  
/**
 * @class ReportData
 * @description Report data means the data that is sent to the client
 */
export class ReportData {
    @ApiProperty({ description: 'id', example: 1 })
    public id: string;

    @ApiProperty({ description: 'employeeId', example: 1 })
    public employeeId: string;

    @ApiProperty({ description: 'date', example: '2022-01-01' })
    public date: Date;

    @ApiProperty({ description: 'notes', example: 'notes' })
    public notes: string;

    @ApiProperty({ description: 'createdAt', example: '2022-01-01 08:00:00' })
    public createdAt: Date;

    @ApiProperty({ description: 'updatedAt', example: '2022-01-01 08:00:00' })
    public updatedAt: Date;
}