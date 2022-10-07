import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ReportData                             } from '.';

/**
 * @class Report
 * @description Report entity means the report table in the database
 */
@Entity({ name: 'report' })
export class Report {
    constructor(...data: Partial<Report>[]) {
        Object.assign(this, ...data);
    }
    // model Employee {
//     id          String       @id @default(cuid()) @map("_id")
//     name        String
//     phone       String       @unique
//     email       String       @unique
//     password    String
//     position    String
//     role        String
//     company     Company      @relation(fields: [companyId], references: [id])
//     companyId   String
//     address     String?
//     reports Report[]
//     reports     Report[]
//     tasks       Task[]
//     createdAt   DateTime     @default(now())
//     updatedAt   DateTime     @updatedAt
//   }
  
//   model Attendace {
//     id         String   @id @default(cuid()) @map("_id")
//     date       DateTime
//     workStart  DateTime
//     workEnd    DateTime
//     breakStart DateTime
//     breakEnd   DateTime
//     report   Report @relation(fields: [reportId], references: [id])
//     reportId String
//     createdAt  DateTime @default(now())
//     updatedAt  DateTime @updatedAt
//   }
  
//   model Report {
//     id         String   @id @default(cuid()) @map("_id")
//     date       DateTime
//     tasks      Task[]
//     notes      String?
//     report   Report @relation(fields: [reportId], references: [id])
//     reportId String
//     createdAt  DateTime @default(now())
//     updatedAt  DateTime @updatedAt
//   }
  
//   model Task {
//     id          String   @id @default(cuid()) @map("_id")
//     title       String
//     description String?
//     deadline    DateTime
//     isWorking   Boolean  @default(false)
//     report    Report @relation(fields: [reportId], references: [id])
//     reportId  String
//     report      Report?  @relation(fields: [reportId], references: [id])
//     reportId    String?
//     createdAt   DateTime @default(now())
//     updatedAt   DateTime @updatedAt
//   }
  
//   model Company {
//     id        String     @id @default(cuid()) @map("_id")
//     name      String
//     address   String
//     reports Report[]
//     createdAt DateTime   @default(now())
//     updatedAt DateTime   @updatedAt
//   }
    /**
     * @method set
     * @description Set report data
     * @param {ReportData} data
     * @returns {void}
     */
    public set(data: ReportData): void {
        Object.assign(this, data);
    }

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: string;

    @Column({ name: 'employee_id' })
    public employeeId: string;

    @Column({ name: 'date' })
    public date: Date;

    @Column({ name: 'notes' })
    public notes: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt: Date;

    // @OneToMany(() => Task, task => task.report)
    
    
    /**
     * @method buildData
     * @description Build report data
     * @returns {ReportData}
     */
    public buildData(): ReportData {
        return {
            id        : this.id,
            employeeId: this.employeeId,
            date      : this.date,
            notes     : this.notes,
            createdAt : this.createdAt,
            updatedAt : this.updatedAt,
        };
    }
}