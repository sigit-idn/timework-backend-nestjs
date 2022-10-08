import { Module           } from '@nestjs/common';
import { TypeOrmModule    } from '@nestjs/typeorm';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule       } from './auth/auth.module';
import { CommonModule     } from './common';
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
        AuthModule
    ]
})
export class ApplicationModule { }
