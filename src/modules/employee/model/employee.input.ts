import { ApiProperty } from '@nestjs/swagger';

/**
 * @class EmployeeInput
 * @description Employee input is used to create and update employee from the client
 */
export class EmployeeInput {
    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    public readonly phone: string;

    @ApiProperty()
    public readonly email: string;

    @ApiProperty()
    public readonly password: string;

    @ApiProperty()
    public readonly position: string;

    @ApiProperty()
    public readonly role: string;

    @ApiProperty()
    public readonly companyId: string;

    @ApiProperty()
    public readonly address: string;

    @ApiProperty()
    public readonly createdAt: string;

    @ApiProperty()
    public readonly updatedAt: string;
}
