import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository                        } from '@nestjs/typeorm';
import { FindCondition, Repository               } from 'typeorm';
import { Company                                 } from '../model';

/**
 * @class CompanyService
 * @description Company service is used to handle all company related business logic
 */
@Injectable()
export class CompanyService {

    public constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>
    ) { }

    /**
     * @method find
     * @description Find all companys
     * @param {FindCondition<Company>} where
     * @returns {Promise<Company[]>}
     */
    public async find(where?: FindCondition<Company>): Promise<Company[]> {
        return this.companyRepository.find({ where });
    }

    /**
     * @method findOne
     * @description Find one company
     * @param {FindCondition<Company>} where
     * @returns {Promise<Company>}
     */
    public async findOne(where: FindCondition<Company>): Promise<Company> {
        const company = await this.companyRepository.findOne({ where });

        if (!company) {
            throw new PreconditionFailedException('Company not found');
        }

        return company;
    }

    /**
     * @method create
     * @description Create new company
     * @param {Company} input
     * @returns {Promise<Company>}
     */
    public async create(input: Company): Promise<Company> {
        const company = new Company(input);
        
        return this.companyRepository.save(company);
    }

    /**
     * @method update
     * @description Update company
     * @param {Company} input
     * @returns {Promise<Company>}
     */
    public async update({id, ...input}: Company): Promise<Company> {
        const company = await this.findOne({id});

        company.set({ id, ...input });

        return company;
    }

    /**
     * @method delete
     * @description Delete company
     * @param {Company} input
     * @returns {Promise<Company>}
     */
    public async delete({id}: Company): Promise<Company> {
        const company = await this.findOne({id});

        return this.companyRepository.remove(company);
    }
}
