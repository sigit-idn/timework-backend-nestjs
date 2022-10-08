import { ApiProperty } from '@nestjs/swagger';
  
/**
 * @class CompanyData
 * @description Company data means the data that is sent to the client
 */
export class CompanyData {
    @ApiProperty({ description: 'id', example: 1 })
    public id: string;

    @ApiProperty({ description: 'name', example: '株式会社 ABC' })
    public name: string;

    @ApiProperty({ description: 'address', example: '東京都港区六本木1-1-1' })
    public address: string;

    @ApiProperty({ description: 'phone', example: '03-1234-5678' })
    public phone: string;

    @ApiProperty({ description: 'email', example: 'info@abc.com' })
    public email: string;

    @ApiProperty({ description: 'date of establishment', example: '2020-01-01' })
    public dateOfEstablishment: string;

    @ApiProperty({ description: 'company number', example: '1234567890' })
    public companyNumber: string;

    @ApiProperty({ description: 'created at', example: '2020-01-01 00:00:00' })
    public createdAt: Date;

    @ApiProperty({ description: 'updated at', example: '2020-01-01 00:00:00' })
    public updatedAt: Date;
}