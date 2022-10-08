import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyData                                       } from '.';
import { Employee                                          } from '../../employee/model';

/**
 * @class Company
 * @description Company entity means the company table in the database
 */
@Entity({ name: 'company' })
export class Company {
    constructor(...data: Partial<Company>[]) {
        Object.assign(this, ...data);
    }

    /**
     * @method set
     * @description Set company data
     * @param {CompanyData} data
     * @returns {void}
     */
    public set(data: CompanyData): void {
        Object.assign(this, data);
    }

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: string;

    @Column({ name: 'name', type: 'varchar' })
    public name: string;

    @Column({ name: 'address', type: 'varchar' })
    public address: string;

    @Column({ name: 'phone', type: 'varchar' })
    public phone: string;

    @Column({ name: 'email', type: 'varchar' })
    public email: string;
    
    @Column({ name: 'date_of_establishment', type: 'varchar' })
    public dateOfEstablishment: string;
    
    @Column({ name: 'company_number', type: 'varchar' })
    public companyNumber: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt: Date;

    @OneToMany(() => Employee, employee => employee.companyId)
    public employees: Employee[];

    /**
     * @method buildData
     * @description Build company data
     * @returns {CompanyData}
     */
    public buildData(): CompanyData {
        return {
            id                 : this.id,
            name               : this.name,
            address            : this.address,
            phone              : this.phone,
            email              : this.email,
            dateOfEstablishment: this.dateOfEstablishment,
            companyNumber      : this.companyNumber,
            createdAt          : this.createdAt,
            updatedAt          : this.updatedAt,
        };
    }
}