import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeData } from '.';
import { Role } from '../../../enums/role';

/**
 * @class Employee
 * @description Employee entity means the employee table in the database
 */
@Entity({ name: 'employee' })
export class Employee {

    public static readonly NAME_LENGTH = 50;
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
//     attendances Attendance[]
//     reports     Report[]
//     tasks       Task[]
//     createdAt   DateTime     @default(now())
//     updatedAt   DateTime     @updatedAt
//   }
  
//   model Attendance {
//     id         String   @id @default(cuid()) @map("_id")
//     date       DateTime
//     workStart  DateTime
//     workEnd    DateTime
//     breakStart DateTime
//     breakEnd   DateTime
//     employee   Employee @relation(fields: [employeeId], references: [id])
//     employeeId String
//     createdAt  DateTime @default(now())
//     updatedAt  DateTime @updatedAt
//   }
  
//   model Report {
//     id         String   @id @default(cuid()) @map("_id")
//     date       DateTime
//     tasks      Task[]
//     notes      String?
//     employee   Employee @relation(fields: [employeeId], references: [id])
//     employeeId String
//     createdAt  DateTime @default(now())
//     updatedAt  DateTime @updatedAt
//   }
  
//   model Task {
//     id          String   @id @default(cuid()) @map("_id")
//     title       String
//     description String?
//     deadline    DateTime
//     isWorking   Boolean  @default(false)
//     employee    Employee @relation(fields: [employeeId], references: [id])
//     employeeId  String
//     report      Report?  @relation(fields: [reportId], references: [id])
//     reportId    String?
//     createdAt   DateTime @default(now())
//     updatedAt   DateTime @updatedAt
//   }
  
//   model Company {
//     id        String     @id @default(cuid()) @map("_id")
//     name      String
//     address   String
//     employees Employee[]
//     createdAt DateTime   @default(now())
//     updatedAt DateTime   @updatedAt
//   }

    @PrimaryGeneratedColumn()
    public id: string;

    @Column({ name: 'name', type: 'varchar', length: Employee.NAME_LENGTH })
    public name: string;

    @Column({ name: 'phone', type: 'varchar', nullable: true })
    public phone: string;

    @Column({ name: 'email', type: 'varchar' })
    public email: string;

    @Column({ name: 'password', type: 'varchar' })
    public password: string;

    @Column({ name: 'position', type: 'varchar' })
    public position: string;

    @Column({ name: 'role', type: 'varchar' })
    public role: Role;

    @Column({ name: 'companyId', type: 'varchar' })
    public companyId: string;

    @Column({ name: 'address', type: 'varchar', nullable: true })
    public address: string;

    @Column({ name: 'createdAt', type: 'varchar', default: () => 'now()' })
    public createdAt: string;

    @Column({ name: 'updatedAt', type: 'varchar', default: () => 'now()' })
    public updatedAt: string;


    public buildData(): EmployeeData {

        return {
            id       : this.id,
            name     : this.name,
            phone    : this.phone,
            email    : this.email,
            password : this.password,
            position : this.position,
            role     : this.role,
            companyId: this.companyId,
            address  : this.address,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

}
