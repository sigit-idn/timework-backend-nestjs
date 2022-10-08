import { ApiProperty } from '@nestjs/swagger';

/**
 * @class CompanyInput
 * @description Company input is used to create and update company from the client
 */
export class CompanyInput {
    @ApiProperty()
    public employeeId: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public address: string;

    @ApiProperty()
    public phone: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public dateOfEstablishment: string;

    @ApiProperty()
    public companyNumber: string;

    @ApiProperty()
    public createdAt: Date;

    @ApiProperty()
    public updatedAt: Date;
}