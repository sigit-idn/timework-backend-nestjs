import { Module             } from '@nestjs/common';
import { TypeOrmModule      } from '@nestjs/typeorm';
import { CommonModule       } from '../common';
import { EmployeeController } from './controller';
import { Employee           } from './model';
import { EmployeeService    } from './service';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([
            Employee
        ])
    ],
    providers: [
        EmployeeService
    ],
    controllers: [
        EmployeeController
    ],
    exports: [
        EmployeeService
    ]
})
export class EmployeeModule { }
