import { Controller, Get, HttpStatus, Inject, Post, PreconditionFailedException, Query, Body, UseGuards, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindCondition                       } from 'typeorm';
import { Config, LoggerService               } from '../../common';
import { SuperadminGuard                     } from '../../common/security';
import { Service                             } from '../../tokens';
import { CompanyPipe                         } from '../flow';
import { Company, CompanyData                } from '../model';
import { CompanyService                      } from '../service';

/**
 * @class CompanyController
 * @description Company controller is used to handle all the requests related to company
 */
@Controller('companies')
@ApiTags('company')
@ApiBearerAuth()
@UseGuards(SuperadminGuard)
export class CompanyController {

    public constructor(
        @Inject(Service.CONFIG)
        private readonly config        : Config,
        private readonly logger        : LoggerService,
        private readonly companyService: CompanyService
    ) { }

    /**
     * @method find
     * @description Find all companies
     * @param {FindCondition<Company>} where
     * @returns {Promise<CompanyData[]>}
     */
    @Get()
    @ApiResponse({
        status     : HttpStatus.OK,
        description: 'Find all companies',
        type       : CompanyData
    })
    public async find(@Query() where?: FindCondition<Company>): Promise<CompanyData[]> {
        const companies = await this.companyService.find(where);

        return companies.map(company => company.buildData());
    }

    /**
     * @method findOne
     * @description Find one company by id
     * @param {string} id
     * @returns {Promise<CompanyData>}
     */
    @Get(':id')
    @ApiResponse({
        status     : HttpStatus.OK,
        description: 'Find one company by id',
        type       : CompanyData
    })
    async findOne(@Param() { id }: Company): Promise<CompanyData> {
        const company = await this.companyService.findOne({id});
        

        if (!company) {
            throw new PreconditionFailedException('Company not found');
        }

        return company.buildData();
    }

    /**
     * @method create
     * @description Create a new company
     * @param {Company} input
     * @returns {Promise<CompanyData>}
     */
    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, type: CompanyData })
    public async create(@Body(CompanyPipe) input: Company): Promise<CompanyData> {

        if (this.config.EMPLOYEES_ALLOWED === 'no') {
            throw new PreconditionFailedException(`Not allowed to onboard companies`);
        }

        const company = await this.companyService.create(input);
        this.logger.info(`Created new company with ID ${company.id}`);

        return company.buildData();
    }

    /**
     * @method update
     * @description Update an existing company
     * @param {Company} input
     * @returns {Promise<CompanyData>}
     */
    @Put(':id')
    @ApiResponse({ status: HttpStatus.OK, type: CompanyData })
    public async update(
        @Param() { id }: Company,
        @Body(CompanyPipe) { id: companyId, ...input }: Company)
    : Promise<CompanyData> {
        const company = await this.companyService.update({id, ...input} as Company);
        this.logger.info(`Updated company with ID ${company.id}`);

        return company.buildData();
    }

}
