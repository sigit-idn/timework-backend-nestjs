import { Module             } from '@nestjs/common';
import { TypeOrmModule      } from '@nestjs/typeorm';
import { CommonModule       } from '../common';
import { TaskModule         } from '../task/task.module';
import { EmployeeController } from './controller';
import { Employee           } from './model';
import { EmployeeService    } from './service';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([
            Employee
        ]),
        TaskModule
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
