import { ApiProperty } from '@nestjs/swagger';
  
/**
 * @class EmployeeData
 * @description Employee data means the data that is sent to the client
 */
export class EmployeeData {
    @ApiProperty({ description: 'id', example: 1 })
    public id: string;

    @ApiProperty({ description: 'name', example: 'Admin' })
    public name: string;

    @ApiProperty({ description: 'phone', example: '0123456789' })
    public phone: string;

    @ApiProperty({ description: 'email', example: 'admin@email.com' })
    public email: string;

    @ApiProperty({ description: 'password', example: '123456' })
    public password?: string;

    @ApiProperty({ description: 'position', example: 'product_manager' })
    public position: string;

    @ApiProperty({ description: 'role', example: 'admin' })
    public role: string;

    @ApiProperty({ description: 'companyID', example: '1' })
    public companyId: string;

    @ApiProperty({ description: 'address', example: 'Kyoto' })
    public address: string;

    @ApiProperty({ description: 'createdAt', example: '2021-01-01 00:00:00' })
    public createdAt: string;

    @ApiProperty({ description: 'updatedAt', example: '2021-01-01 00:00:00' })
    public updatedAt: string;
}