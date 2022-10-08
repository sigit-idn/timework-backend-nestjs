import { Module           } from '@nestjs/common';
import { TypeOrmModule    } from '@nestjs/typeorm';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule       } from './auth/auth.module';
import { CommonModule     } from './common';
import { CompanyModule    } from './company/company.module';
import { EmployeeModule   } from './employee/employee.module';
import { ReportModule     } from './report/report.module';
import { TaskModule       } from './task/task.module';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forRoot(),
        EmployeeModule,
        AttendanceModule,
        ReportModule,
        TaskModule,
        CompanyModule,
        AuthModule
    ]
})
export class ApplicationModule { }
