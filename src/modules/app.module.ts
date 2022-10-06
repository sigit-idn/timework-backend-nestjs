import { Module         } from '@nestjs/common';
import { TypeOrmModule  } from '@nestjs/typeorm';
import { CommonModule   } from './common';
import { EmployeeModule } from './employee/employee.module';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forRoot(),
        EmployeeModule
    ]
})
export class ApplicationModule { }
