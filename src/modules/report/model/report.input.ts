import { ApiProperty } from '@nestjs/swagger';

/**
 * @class ReportInput
 * @description Report input is used to create and update report from the client
 */
export class ReportInput {
    @ApiProperty()
    public employeeId: string;

    @ApiProperty()
    public date: Date;

    @ApiProperty()
    public notes: string;
}