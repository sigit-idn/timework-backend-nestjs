import { Controller, Get, HttpStatus, Inject, Post, PreconditionFailedException, Query, Body, Param, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindCondition                       } from 'typeorm';
import { Config, LoggerService               } from '../../common';
import { Service                             } from '../../tokens';
import { ReportPipe                          } from '../flow';
import { Report, ReportData                  } from '../model';
import { ReportService                       } from '../service';

/**
 * @class ReportController
 * @description Report controller is used to handle all the requests related to report
 */
@Controller('reports')
@ApiTags('report')
@ApiBearerAuth()
// @UseGuards(EmployeeGuard)
export class ReportController {

    public constructor(
        @Inject(Service.CONFIG)
        private readonly config       : Config,
        private readonly logger       : LoggerService,
        private readonly reportService: ReportService
    ) { }

    /**
     * @method find
     * @description Find all reports
     * @param {FindCondition<Report>} where
     * @returns {Promise<ReportData[]>}
     */
    @Get()
    @ApiResponse({
        status     : HttpStatus.OK,
        description: 'Find all reports',
        type       : ReportData
    })
    public async find(
        @Query() where?: FindCondition<Report>|any,
        @Req() req?: Request | any
    ): Promise<ReportData[]> {
        where.employeeId = req.params.employeeId;
        
        const reports = await this.reportService.find(where);
        console.log('reports', reports);
        

        return reports.map(report => report.buildDataWithRelations());
    }

    /**
     * @method findOne
     * @description Find one report by id
     * @param {string} id
     * @returns {Promise<ReportData>}
     */
    @Get(':id')
    @ApiResponse({
        status     : HttpStatus.OK,
        description: 'Find one report by id',
        type       : ReportData
    })
    async findOne(@Param() { id }: Report): Promise<ReportData> {
        const report = await this.reportService.findOne({id});

        if (!report) {
            throw new PreconditionFailedException('Report not found');
        }

        return report.buildData();
    }

    /**
     * @method create
     * @description Create a new report
     * @param {Report} input
     * @returns {Promise<ReportData>}
     */
    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, type: ReportData })
    public async create(@Body(ReportPipe) input: Report): Promise<ReportData> {

        if (this.config.EMPLOYEES_ALLOWED === 'no') {
            throw new PreconditionFailedException(`Not allowed to onboard reports`);
        }

        const report = await this.reportService.create(input);
        this.logger.info(`Created new report with ID ${report.id}`);

        return report.buildData();
    }

    /**
     * @method update
     * @description Update an existing report
     * @param {Report} input
     * @returns {Promise<ReportData>}
     */
    @Put(':id')
    @ApiResponse({ status: HttpStatus.OK, type: ReportData })
    public async update(
        @Param() { id }: Report,
        @Body(ReportPipe) { id: reportId, ...input }: Report)
    : Promise<ReportData> {
        const report = await this.reportService.update({id, ...input} as Report);
        this.logger.info(`Updated report with ID ${report.id}`);

        return report.buildData();
    }

}
