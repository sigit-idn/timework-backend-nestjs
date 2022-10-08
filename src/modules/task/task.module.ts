import { Module           } from '@nestjs/common';
import { TypeOrmModule    } from '@nestjs/typeorm';
import { CommonModule     } from '../common';
import { TaskController } from './controller';
import { Task           } from './model';
import { TaskService    } from './service';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([
            Task
        ])
    ],
    providers: [
        TaskService
    ],
    controllers: [
        TaskController
    ],
    exports: [
        TaskService
    ]
})
export class TaskModule { }
