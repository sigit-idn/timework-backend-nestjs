import { Module           } from '@nestjs/common';
import { TypeOrmModule    } from '@nestjs/typeorm';
import { CommonModule     } from '../common';
import { ReportController } from './controller';
import { Report           } from './model';
import { ReportService    } from './service';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([
            Report
        ])
    ],
    providers: [
        ReportService
    ],
    controllers: [
        ReportController
    ],
    exports: [
        ReportService
    ]
})
export class ReportModule { }
