import { Module            } from '@nestjs/common';
import { TypeOrmModule     } from '@nestjs/typeorm';
import { CommonModule      } from '../common';
import { CompanyController } from './controller';
import { Company           } from './model';
import { CompanyService    } from './service';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([
            Company
        ])
    ],
    providers: [
        CompanyService
    ],
    controllers: [
        CompanyController
    ],
    exports: [
        CompanyService
    ]
})
export class CompanyModule { }
