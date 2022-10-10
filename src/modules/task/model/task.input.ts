import { ApiProperty } from '@nestjs/swagger';

/**
 * @class TaskInput
 * @description Task input is used to create and update task from the client
 */
export class TaskInput {
    @ApiProperty()
    public employeeId: string;

    @ApiProperty()
    public reportId: string|undefined;

    @ApiProperty()
    public title: string;

    @ApiProperty()
    public description: string;

    @ApiProperty()
    public deadline: Date;

    @ApiProperty()
    public taskStart: Date|null;

    @ApiProperty()
    public taskEnd: Date|null;

    @ApiProperty()
    public isWorking: boolean;
}