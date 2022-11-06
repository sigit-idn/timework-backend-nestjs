import { Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import { ApiResponse                         } from '@nestjs/swagger';
import { AttendanceService                   } from '../../attendance/service';
import { LoggerService                       } from '../../common';
import { EmployeeService                     } from '../../employee/service';
import { ReportService                       } from '../../report/service';
import { TaskService                         } from '../../task/service';


@Controller('')
export class CommonController {

		constructor(
				@Inject(EmployeeService) 
				private readonly employeeService: EmployeeService,

				@Inject(LoggerService)
				private readonly logger: LoggerService,

				@Inject(TaskService)
				private readonly taskService: TaskService,

				@Inject(ReportService)
				private readonly reportService: ReportService,

				@Inject(AttendanceService)
				private readonly attendanceService: AttendanceService

		) {}

		@Get('')
		@ApiResponse({ status: HttpStatus.OK, description: 'Welcome to the API' })
		public async welcome(): Promise<any> {
			const employees   = await this.employeeService.find();
			const tasks       = await this.taskService.find();
			const reports     = await this.reportService.find();
			const attendances = await this.attendanceService.find();

			console.log({
				employees,
				tasks,
				reports,
				attendances
			});

			return {
				employees,
				tasks,
				reports,
				attendances
			};
		}
	}

