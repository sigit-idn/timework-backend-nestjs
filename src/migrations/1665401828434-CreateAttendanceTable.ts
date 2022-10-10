import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAttendanceTable1665401828434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'attendances',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'employee_id',
                    type: 'int',
                },
                {
                    name: 'date',
                    type: 'varchar',
                },
                {
                    name: 'work_start',
                    type: 'timestamp',
                },
                {
                    name: 'work_end',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'break_start',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'break_end',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('attendances');
    }

}
