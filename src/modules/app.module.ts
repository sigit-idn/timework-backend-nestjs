import { Module         } from '@nestjs/common';
import { TypeOrmModule  } from '@nestjs/typeorm';
import { AuthModule     } from './auth/auth.module';
import { CommonModule   } from './common';
import { EmployeeModule } from './employee/employee.module';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forRoot(),
        EmployeeModule,
        AuthModule
    ]
})
export class ApplicationModule { }