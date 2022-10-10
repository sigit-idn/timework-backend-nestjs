import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTaskTable1665401831247 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tasks',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'employee_id',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'report_id',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'deadline',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'is_working',
                    type: 'boolean',
                    default: false,
                    isNullable: false,
                },
                {
                    name: 'task_start',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'task_end',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('tasks');
    }

}
