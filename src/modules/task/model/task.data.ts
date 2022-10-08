import { ApiProperty } from '@nestjs/swagger';
  
/**
 * @class TaskData
 * @description Task data means the data that is sent to the client
 */
export class TaskData {
    @ApiProperty({ description: 'id', example: 1 })
    public id: string;

    @ApiProperty({ description: 'employeeId', example: 1 })
    public employeeId: string;

    @ApiProperty({ description: 'reportId', example: 1 })
    public reportId: string;

    @ApiProperty({ description: 'title', example: 'title' })
    public title: string;

    @ApiProperty({ description: 'description', example: 'description' })
    public description: string;

    @ApiProperty({ description: 'deadline', example: '2022-01-01 08:00:00' })
    public deadline: Date;

    @ApiProperty({ description: 'taskStart', example: '2022-01-01 08:00:00' })
    public taskStart: Date|null;

    @ApiProperty({ description: 'taskEnd', example: '2022-01-01 17:00:00' })
    public taskEnd: Date|null;

    @ApiProperty({ description: 'isWorking', example: true })
    public isWorking: boolean;

    @ApiProperty({ description: 'createdAt', example: '2022-01-01 08:00:00' })
    public createdAt: Date;

    @ApiProperty({ description: 'updatedAt', example: '2022-01-01 08:00:00' })
    public updatedAt: Date;
}