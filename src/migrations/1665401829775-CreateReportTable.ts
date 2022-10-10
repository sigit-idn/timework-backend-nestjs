import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateReportTable1665401829775 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "reports",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "employee_id",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "date",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "notes",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("reports");
    }

}
