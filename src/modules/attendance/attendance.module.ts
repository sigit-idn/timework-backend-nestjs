import { Module               } from '@nestjs/common';
import { TypeOrmModule        } from '@nestjs/typeorm';
import { CommonModule         } from '../common';
import { AttendanceController } from './controller';
import { Attendance           } from './model';
import { AttendanceService    } from './service';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([
            Attendance
        ])
    ],
    providers: [
        AttendanceService
    ],
    controllers: [
        AttendanceController
    ],
    exports: [
        AttendanceService
    ]
})
export class AttendanceModule { }
