import { forwardRef, Inject, Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository                        } from '@nestjs/typeorm';
import { FindCondition, In, Like, Repository         } from 'typeorm';
import { TaskService } from '../../task/service';
import { Report, ReportInput                     } from '../model';

/**
 * @class ReportService
 * @description Report service is used to handle all report related business logic
 */
@Injectable()
export class ReportService {

    public constructor(
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>,

        @Inject(forwardRef(() => TaskService))
        private readonly taskService: TaskService,
    ) { }

    /**
     * @method find
     * @description Find all reports
     * @param {FindCondition<Report>} where
     * @returns {Promise<Report[]>}
     */
    public async find(where?: FindCondition<Report>): Promise<Report[]> {
        if (where && (where as any).month) {
            const month = (where as any).month;
            delete (where as any).month;

            (where as any).date = Like(`%${month}%`);
        }
        
        const reports = await this.reportRepository.find({ 
            relations: ['tasks'],
            where: {
                ...where,
            },
         });

        const tasks = await this.taskService.find({
            reportId: In(reports.map(({ id }) => id)),
        });

        reports.forEach(report => {
            report.tasks = tasks.filter(({ reportId }) => reportId == report.id);
        })

        return reports;
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
    public async create(input: ReportInput): Promise<Report> {
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
