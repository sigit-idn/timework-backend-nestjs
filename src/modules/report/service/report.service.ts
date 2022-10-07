import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository                        } from '@nestjs/typeorm';
import { FindCondition, Repository               } from 'typeorm';
import { Report                              } from '../model';

/**
 * @class ReportService
 * @description Report service is used to handle all report related business logic
 */
@Injectable()
export class ReportService {

    public constructor(
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>
    ) { }

    /**
     * @method find
     * @description Find all reports
     * @param {FindCondition<Report>} where
     * @returns {Promise<Report[]>}
     */
    public async find(where?: FindCondition<Report>): Promise<Report[]> {
        return this.reportRepository.find({ where });
    }

    /**
     * @method findOne
     * @description Find one report
     * @param {FindCondition<Report>} where
     * @returns {Promise<Report>}
     */
    public async findOne(where: FindCondition<Report>): Promise<Report> {
        const report = await this.reportRepository.findOne({ where });

        if (!report) {
            throw new PreconditionFailedException('Report not found');
        }

        return report;
    }

    /**
     * @method create
     * @description Create new report
     * @param {Report} input
     * @returns {Promise<Report>}
     */
    public async create(input: Report): Promise<Report> {
        const report = new Report(input);
        
        return this.reportRepository.save(report);
    }

    /**
     * @method update
     * @description Update report
     * @param {Report} input
     * @returns {Promise<Report>}
     */
    public async update({id, ...input}: Report): Promise<Report> {
        const report = await this.findOne({id});

        report.set({
            id,
            ...input,
        });

        return report;
    }

    /**
     * @method delete
     * @description Delete report
     * @param {Report} input
     * @returns {Promise<Report>}
     */
    public async delete({id}: Report): Promise<Report> {
        const report = await this.findOne({id});

        return this.reportRepository.remove(report);
    }
}
